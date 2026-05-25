"""Run the generic AI Software Firm against the InteropMed project.

Copy this file into the InteropMed repository as `tools/firm_runner.py`.
It imports the reusable firm engine from the sibling ai_software_firm folder.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

INTEROPMED_ROOT = Path(__file__).resolve().parents[1]
FIRM_ROOT = INTEROPMED_ROOT.parent / "ai_software_firm"
sys.path.insert(0, str(FIRM_ROOT))

from firm import UniversalAIFirm
from utils.groq_worker_pool import GroqWorkerPool


REPORT_DIR = INTEROPMED_ROOT / ".firm"
REPORT_JSON = REPORT_DIR / "latest_report.json"
REPORT_MD = REPORT_DIR / "latest_report.md"


def read_text(path: Path, limit: int = 12000) -> str:
    if not path.exists():
        return ""
    text = path.read_text(encoding="utf-8", errors="replace")
    return text[:limit]


def list_relative(pattern: str) -> list[str]:
    return sorted(str(path.relative_to(INTEROPMED_ROOT)) for path in INTEROPMED_ROOT.glob(pattern))


def scan_project() -> dict[str, Any]:
    package = json.loads(read_text(INTEROPMED_ROOT / "package.json") or "{}")
    prisma_schema = read_text(INTEROPMED_ROOT / "prisma" / "schema.prisma", limit=50000)
    prisma_models = []
    for line in prisma_schema.splitlines():
        stripped = line.strip()
        if stripped.startswith("model "):
            prisma_models.append(stripped.split()[1])

    return {
        "name": package.get("name", "interopmed"),
        "version": package.get("version"),
        "scripts": package.get("scripts", {}),
        "dependencies": package.get("dependencies", {}),
        "dev_dependencies": package.get("devDependencies", {}),
        "prisma_model_count": len(prisma_models),
        "prisma_models": prisma_models,
        "api_routes": list_relative("src/app/api/**/route.ts"),
        "pages": list_relative("src/app/**/page.tsx"),
        "components": list_relative("src/components/**/*.tsx"),
        "lib_files": list_relative("src/lib/**/*.ts"),
    }


def run_command(command: list[str]) -> dict[str, Any]:
    started = datetime.now()
    try:
        completed = subprocess.run(
            command,
            cwd=INTEROPMED_ROOT,
            text=True,
            capture_output=True,
            timeout=120,
        )
        return {
            "command": " ".join(command),
            "returncode": completed.returncode,
            "stdout": completed.stdout[-6000:],
            "stderr": completed.stderr[-6000:],
            "duration_seconds": (datetime.now() - started).total_seconds(),
        }
    except Exception as exc:
        return {
            "command": " ".join(command),
            "returncode": -1,
            "stdout": "",
            "stderr": str(exc),
            "duration_seconds": (datetime.now() - started).total_seconds(),
        }


def run_project_checks(enabled: bool) -> list[dict[str, Any]]:
    if not enabled:
        return []
    npm = shutil.which("npm") or shutil.which("npm.cmd") or "npm.cmd"
    return [
        run_command([npm, "run", "type-check"]),
        run_command([npm, "run", "lint"]),
    ]


def run_firm(scan: dict[str, Any]) -> dict[str, Any]:
    firm = UniversalAIFirm()
    firm.create_project(
        "InteropMed",
        "Healthcare interoperability platform built with Next.js and Prisma",
    )

    features = [
        "FHIR-aligned API surface",
        "Clinical data documentation",
        "Patient and record API reliability",
        "Security and compliance readiness",
        "Implementation and conversion pages",
    ]

    agent_outputs = {
        "product": firm.agents["Product_Manager"].execute({
            "type": "feature_definition",
            "requested_features": features,
        }),
        "roadmap": firm.agents["Product_Manager"].execute({
            "type": "roadmap_planning",
            "timeline": "6 weeks",
            "milestones": ["API hardening", "FHIR docs", "QA checks", "launch review"],
        }),
        "architecture": firm.agents["Architect"].execute({
            "type": "system_design",
            "pattern": "Next.js App Router with Prisma data layer",
            "components": ["Next.js app", "API routes", "Prisma", "PostgreSQL", "FHIR docs"],
        }),
        "security": firm.agents["Security_Officer"].execute({
            "type": "compliance_check",
            "standards": ["HIPAA-ready audit posture", "FHIR governance", "SOC 2 preparation"],
        }),
        "devops": firm.agents["DevOps_Engineer"].execute({
            "type": "ci_cd_pipeline",
            "stages": ["type-check", "lint", "build", "migration check"],
        }),
        "qa": firm.agents["QA_Tester"].execute({
            "type": "test_planning",
            "features": features,
        }),
        "docs": firm.agents["Documentation_Manager"].execute({
            "type": "technical_documentation",
            "topics": ["FHIR API reference", "deployment", "data model", "compliance"],
        }),
    }

    groq_pool = GroqWorkerPool()
    groq_pool.register_worker("InteropMed_Strategist", "Healthcare interoperability strategist")
    prompt = (
        "Review this InteropMed project scan and produce the next five practical "
        "engineering priorities. Focus on Next.js, Prisma, FHIR-aligned API design, "
        "compliance, and launch readiness.\n\n"
        + json.dumps({
            "scripts": scan["scripts"],
            "api_routes": scan["api_routes"],
            "page_count": len(scan["pages"]),
            "prisma_models": scan["prisma_models"][:60],
        }, indent=2)
    )
    groq_pool.submit_job("interopmed_priority_review", "InteropMed_Strategist", prompt, priority=9)
    groq_result = groq_pool.execute_job("interopmed_priority_review")

    return {
        "firm_status": firm.get_firm_status(),
        "agent_outputs": agent_outputs,
        "groq_result": groq_result,
    }


def make_recommendations(scan: dict[str, Any], checks: list[dict[str, Any]]) -> list[str]:
    recommendations = [
        "Add request validation to API route POST handlers before writing to Prisma.",
        "Document the core Prisma model groups so contributors can navigate the schema.",
        "Keep product-specific agents and prompts inside InteropMed, not inside ai_software_firm.",
    ]
    if "type-check" in scan["scripts"]:
        recommendations.append("Keep type-check as a required pre-merge check.")
    if "build" in scan["scripts"]:
        recommendations.append("Use npm run build as the release gate after Prisma generation.")
    if any(check.get("returncode") not in (0, None) for check in checks):
        recommendations.append("Fix failing project checks before planning new feature work.")
    return recommendations


def write_reports(scan: dict[str, Any], firm_result: dict[str, Any], checks: list[dict[str, Any]]) -> None:
    REPORT_DIR.mkdir(exist_ok=True)
    report = {
        "generated_at": datetime.now().isoformat(),
        "project_root": str(INTEROPMED_ROOT),
        "firm_root": str(FIRM_ROOT),
        "scan": scan,
        "firm": firm_result,
        "checks": checks,
        "recommendations": make_recommendations(scan, checks),
    }
    REPORT_JSON.write_text(json.dumps(report, indent=2), encoding="utf-8")

    groq = firm_result["groq_result"]
    lines = [
        "# InteropMed Firm Report",
        "",
        f"Generated: {report['generated_at']}",
        "",
        "## Project Scan",
        "",
        f"- API routes: {len(scan['api_routes'])}",
        f"- Pages: {len(scan['pages'])}",
        f"- Components: {len(scan['components'])}",
        f"- Prisma models: {scan['prisma_model_count']}",
        "",
        "## Project Checks",
        "",
    ]
    if checks:
        for check in checks:
            status = "PASS" if check["returncode"] == 0 else "FAIL"
            lines.append(f"- {status}: `{check['command']}` ({check['duration_seconds']:.1f}s)")
    else:
        lines.append("- Not run. Use `--run-checks` to execute npm checks.")

    lines.extend(["", "## Firm Recommendations", ""])
    for item in report["recommendations"]:
        lines.append(f"- {item}")

    lines.extend([
        "",
        "## Groq / Worker Review",
        "",
        f"- Provider: {groq.get('provider')}",
        f"- Status: {groq.get('status')}",
        "",
        "```text",
        str(groq.get("output", "")),
        "```",
    ])
    if groq.get("fallback_reason"):
        lines.extend(["", f"Fallback reason: {groq['fallback_reason']}"])

    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Run AI Software Firm workflow for InteropMed")
    parser.add_argument("--run-checks", action="store_true", help="Run npm type-check and lint")
    args = parser.parse_args()

    scan = scan_project()
    checks = run_project_checks(args.run_checks)
    firm_result = run_firm(scan)
    write_reports(scan, firm_result, checks)

    print("InteropMed firm workflow complete")
    print(f"Markdown report: {REPORT_MD}")
    print(f"JSON report: {REPORT_JSON}")
    print(f"Groq provider: {firm_result['groq_result'].get('provider')}")
    print(f"Groq status: {firm_result['groq_result'].get('status')}")


if __name__ == "__main__":
    main()
