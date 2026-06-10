import { homeStats } from "@/lib/content"

export function StatStrip({ stats = homeStats }: { stats?: typeof homeStats }) {
	return (
		<section className="stats mt-14">
			<div className="wrap">
				{stats.map((s) => (
					<div className="stat" key={s.label}>
						<b>{s.value}</b>
						<span>{s.label}</span>
					</div>
				))}
			</div>
		</section>
	)
}
