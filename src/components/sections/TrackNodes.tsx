import totalStockToCentralHubLine from "../../assets/total-stock-to-central-hub-line.svg";
import centralHubToCargoWarehouseLine from "../../assets/central-hub-to-cargo-warehouse-line.svg";
import cargoWarehouseToBottomLine from "../../assets/cargo-warehouse-to-bottom-line.svg";
import totalStockIcon from "../../assets/total-stock-icon.svg";
import centralHubIcon from "../../assets/central-hub-icon.svg";
import cargoWarehouseIcon from "../../assets/cargo-warehouse-icon.svg";

interface NodeCardProps {
	icon: string;
	title: string;
	value: string;
}

const NodeCard = ({ icon, title, value }: NodeCardProps) => (
	<div
		className="bg-white rounded-xl border border-black/7 flex flex-col items-start justify-between p-3 h-full w-full"
		style={{
			boxShadow: "0px 1px 4.4px rgba(0, 0, 0, 0.06)",
		}}
	>
		<div className="flex flex-row items-center gap-4">
			<img src={icon} alt="" className="w-7 h-7 shrink-0" />
			<span className="text-black text-lg font-normal">{title}</span>
		</div>
		<span className="text-black/40 text-lg ml-[2px]">{value}</span>
	</div>
);

/*
 * Layout derived from the fixed-shape SVG connector lines.
 *
 * Canvas: 410 x 376
 *
 * Cards left-aligned (Total Stock & cargo warehouse share x=4):
 *   Total Stock:      (4,   3)    186×64    → right-center (190, 35)
 *   Central HUB:      (220, 4)    186×62    → left-center  (220, 35), bottom-center (313, 66)
 *   cargo warehouse:  (4, 126.5)  186×61    → top-center   (97, 126.5), bottom-center (97, 187.5)
 *
 * Connector geometry verification:
 *   Horizontal (30×1): gap = 220 - 190 = 30 ✓
 *   Curve 1 (scaled to 217×61): start x = 313, end x = 97 = CW center ✓
 *                               start y = 66, end y ≈ 126.5 = CW top ✓
 *   Curve 2 (118×188):  start x = 97, offset = 97 - 0.5 = 96.5 ✓
 */

const W = 410;
const H = 376;

const pct = (v: number, base: number) => `${(v / base) * 100}%`;

const ConnectionDot = ({ left, top }: { left: number; top: number }) => (
	<div
		className="absolute w-[6px] h-[6px] rounded-full bg-white border border-[#CECECE]"
		style={{
			left: pct(left - 3, W),
			top: pct(top - 3, H),
		}}
	/>
);

const TrackNodes = () => {
	return (
		<div
			className="w-full max-h-full"
			style={{ aspectRatio: `${W} / ${H}` }}
		>
			<div className="relative w-full h-full">
				{/* Total Stock card */}
				<div
					className="absolute"
					style={{
						left: pct(4, W),
						top: pct(3, H),
						width: pct(186, W),
						height: pct(64, H),
					}}
				>
					<NodeCard icon={totalStockIcon} title="Total Stock" value="32" />
				</div>

				{/* Central HUB card */}
				<div
					className="absolute"
					style={{
						left: pct(220, W),
						top: pct(4, H),
						width: pct(186, W),
						height: pct(62, H),
					}}
				>
					<NodeCard icon={centralHubIcon} title="Central HUB" value="32" />
				</div>

				{/* cargo warehouse card */}
				<div
					className="absolute"
					style={{
						left: pct(4, W),
						top: pct(126.5, H),
						width: pct(186, W),
						height: pct(61, H),
					}}
				>
					<NodeCard
						icon={cargoWarehouseIcon}
						title="cargo warehouse"
						value="32"
					/>
				</div>

				{/* Horizontal line: Total Stock right-center (190,35) → Central HUB left-center (220,35) */}
				<img
					src={totalStockToCentralHubLine}
					alt=""
					className="absolute"
					style={{
						left: pct(190, W),
						top: pct(35, H),
						width: pct(30, W),
						height: pct(1, H),
					}}
				/>

				{/* Curved line: Central HUB bottom-center (313,66) → cargo warehouse top-center (97,126.5) */}
				{/* SVG path spans 230 units in 231-wide viewBox; scaled to 217 to cover 216px horizontal gap */}
				<img
					src={centralHubToCargoWarehouseLine}
					alt=""
					className="absolute"
					style={{
						left: pct(96.5, W),
						top: pct(66, H),
						width: pct(217, W),
						height: pct(61, H),
					}}
				/>

				{/* Curved line: cargo warehouse bottom-center (97,187.5) → fade out */}
				<img
					src={cargoWarehouseToBottomLine}
					alt=""
					className="absolute"
					style={{
						left: pct(96.5, W),
						top: pct(187.5, H),
						width: pct(118, W),
						height: pct(188, H),
					}}
				/>

				{/* Connection dots at card edge midpoints */}
				{/* Total Stock right-center */}
				<ConnectionDot left={190} top={35} />
				{/* Central HUB left-center */}
				<ConnectionDot left={220} top={35} />
				{/* Central HUB bottom-center */}
				<ConnectionDot left={313} top={66} />
				{/* cargo warehouse top-center */}
				<ConnectionDot left={97} top={126.5} />
				{/* cargo warehouse bottom-center */}
				<ConnectionDot left={97} top={187.5} />
			</div>
		</div>
	);
};

export default TrackNodes;
