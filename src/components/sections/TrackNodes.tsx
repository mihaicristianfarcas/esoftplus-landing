import { useRef, useEffect, useState, useCallback } from "react";
import totalStockIcon from "../../assets/total-stock-icon.svg";
import centralHubIcon from "../../assets/central-hub-icon.svg";
import cargoWarehouseIcon from "../../assets/cargo-warehouse-icon.svg";

interface NodeCardProps {
	icon: string;
	title: string;
	value: string;
}

const NodeCard = ({ icon, title, value }: NodeCardProps) => (
	<article
		className="bg-white rounded-xl border border-black/7 flex flex-col items-start justify-between p-2 sm:p-3 h-full w-full min-w-0"
		style={{
			boxShadow: "0px 1px 4.4px rgba(0, 0, 0, 0.06)",
		}}
		aria-label={`${title}: ${value} items`}
	>
		<div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 min-w-0 w-full">
			<img
				src={icon}
				alt=""
				className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0"
			/>
			<span className="text-[10px] sm:text-xs md:text-sm lg:text-lg font-normal leading-tight truncate">
				{title}
			</span>
		</div>
		<span className="text-black/40 text-[10px] sm:text-xs md:text-sm lg:text-lg mt-1 ml-[2px]">
			{value}
		</span>
	</article>
);

interface ConnectionPoint {
	x: number;
	y: number;
}

interface CardRefs {
	totalStock: HTMLDivElement | null;
	centralHub: HTMLDivElement | null;
	cargoWarehouse: HTMLDivElement | null;
}

interface TrackNodesProps {
	isLandscape?: boolean;
}

const TrackNodes = ({ isLandscape = false }: TrackNodesProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<CardRefs>({
		totalStock: null,
		centralHub: null,
		cargoWarehouse: null,
	});

	const [connections, setConnections] = useState<{
		totalStockRight: ConnectionPoint;
		centralHubLeft: ConnectionPoint;
		centralHubBottom: ConnectionPoint;
		cargoWarehouseTop: ConnectionPoint;
		cargoWarehouseBottom: ConnectionPoint;
	} | null>(null);

	const calculateConnections = useCallback(() => {
		const container = containerRef.current;
		const { totalStock, centralHub, cargoWarehouse } = cardRefs.current;

		if (!container || !totalStock || !centralHub || !cargoWarehouse) return;

		const containerRect = container.getBoundingClientRect();

		const getRelativePoint = (
			element: HTMLDivElement,
			position: "left" | "right" | "top" | "bottom",
		): ConnectionPoint => {
			const rect = element.getBoundingClientRect();
			const relativeX = rect.left - containerRect.left;
			const relativeY = rect.top - containerRect.top;

			switch (position) {
				case "right":
					return { x: relativeX + rect.width, y: relativeY + rect.height / 2 };
				case "left":
					return { x: relativeX, y: relativeY + rect.height / 2 };
				case "top":
					return { x: relativeX + rect.width / 2, y: relativeY };
				case "bottom":
					return { x: relativeX + rect.width / 2, y: relativeY + rect.height };
			}
		};

		setConnections({
			totalStockRight: getRelativePoint(totalStock, "right"),
			centralHubLeft: getRelativePoint(centralHub, "left"),
			centralHubBottom: getRelativePoint(centralHub, "bottom"),
			cargoWarehouseTop: getRelativePoint(cargoWarehouse, "top"),
			cargoWarehouseBottom: getRelativePoint(cargoWarehouse, "bottom"),
		});
	}, []);

	useEffect(() => {
		calculateConnections();

		const resizeObserver = new ResizeObserver(() => {
			calculateConnections();
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => resizeObserver.disconnect();
	}, [calculateConnections]);

	// Generate path with sharp 90-degree turns and small rounded corners
	const createAngledPath = (
		start: ConnectionPoint,
		end: ConnectionPoint,
		direction: "down-left" | "down-right",
	): string => {
		const radius = 9; // Corner radius for slight rounding

		if (direction === "down-left") {
			// From Central HUB bottom to Cargo Warehouse top
			// Goes down, then sharp left turn, then down to target
			const midY = start.y + (end.y - start.y) / 2;

			return `M ${start.x} ${start.y}
					L ${start.x} ${midY - radius}
					Q ${start.x} ${midY}, ${start.x - radius} ${midY}
					L ${end.x + radius} ${midY}
					Q ${end.x} ${midY}, ${end.x} ${midY + radius}
					L ${end.x} ${end.y}`;
		} else {
			// From Cargo Warehouse bottom, goes down then right
			const turnY = start.y + 40; // How far down before turning right

			return `M ${start.x} ${start.y}
					L ${start.x} ${turnY - radius}
					Q ${start.x} ${turnY}, ${start.x + radius} ${turnY}
					L ${end.x} ${turnY}
					L ${end.x} ${end.y}`;
		}
	};

	const DOT_RADIUS = 5;

	return (
		<div
			ref={containerRef}
			className={`relative w-full h-full ${isLandscape ? "track-nodes-landscape" : ""}`}
			style={{ aspectRatio: isLandscape ? undefined : "410 / 376" }}
		>
			{/* Grid layout for cards */}
			<div className="absolute inset-0 grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_1fr_auto_1fr] gap-x-4 gap-y-4 p-1">
				{/* Total Stock - top left */}
				<div
					ref={(el) => {
						cardRefs.current.totalStock = el;
					}}
					className="col-start-1 row-start-1"
				>
					<NodeCard icon={totalStockIcon} title="Total Stock" value="32" />
				</div>

				{/* Central HUB - top right */}
				<div
					ref={(el) => {
						cardRefs.current.centralHub = el;
					}}
					className="col-start-3 row-start-1"
				>
					<NodeCard icon={centralHubIcon} title="Central HUB" value="32" />
				</div>

				{/* Cargo Warehouse - middle left */}
				<div
					ref={(el) => {
						cardRefs.current.cargoWarehouse = el;
					}}
					className="col-start-1 row-start-3"
				>
					<NodeCard
						icon={cargoWarehouseIcon}
						title="Cargo Warehouse"
						value="32"
					/>
				</div>
			</div>

			{/* SVG overlay for connections */}
			{connections && (
				<svg
					className="absolute inset-0 w-full h-full pointer-events-none"
					style={{ overflow: "visible" }}
				>
					<defs>
						{/* Gradient for fading line */}
						<linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#CECECE" stopOpacity="1" />
							<stop offset="100%" stopColor="#CECECE" stopOpacity="0" />
						</linearGradient>
					</defs>

					{/* Horizontal line: Total Stock → Central HUB */}
					<line
						x1={connections.totalStockRight.x}
						y1={connections.totalStockRight.y}
						x2={connections.centralHubLeft.x}
						y2={connections.centralHubLeft.y}
						stroke="#CECECE"
						strokeWidth="1"
					/>

					{/* Curved line: Central HUB → Cargo Warehouse */}
					<path
						d={createAngledPath(
							connections.centralHubBottom,
							connections.cargoWarehouseTop,
							"down-left",
						)}
						fill="none"
						stroke="#CECECE"
						strokeWidth="1"
					/>

					{/* Curved fading line: Cargo Warehouse → bottom */}
					<path
						d={createAngledPath(
							connections.cargoWarehouseBottom,
							{
								x: connections.cargoWarehouseBottom.x + 80,
								y: connections.cargoWarehouseBottom.y + 150,
							},
							"down-right",
						)}
						fill="none"
						stroke="url(#fadeGradient)"
						strokeWidth="1"
					/>

					{/* Connection dots */}
					{/* Total Stock right */}
					<circle
						cx={connections.totalStockRight.x}
						cy={connections.totalStockRight.y}
						r={DOT_RADIUS}
						fill="white"
						stroke="#CECECE"
						strokeWidth="1"
					/>
					{/* Central HUB left */}
					<circle
						cx={connections.centralHubLeft.x}
						cy={connections.centralHubLeft.y}
						r={DOT_RADIUS}
						fill="white"
						stroke="#CECECE"
						strokeWidth="1"
					/>
					{/* Central HUB bottom */}
					<circle
						cx={connections.centralHubBottom.x}
						cy={connections.centralHubBottom.y}
						r={DOT_RADIUS}
						fill="white"
						stroke="#CECECE"
						strokeWidth="1"
					/>
					{/* Cargo Warehouse top */}
					<circle
						cx={connections.cargoWarehouseTop.x}
						cy={connections.cargoWarehouseTop.y}
						r={DOT_RADIUS}
						fill="white"
						stroke="#CECECE"
						strokeWidth="1"
					/>
					{/* Cargo Warehouse bottom */}
					<circle
						cx={connections.cargoWarehouseBottom.x}
						cy={connections.cargoWarehouseBottom.y}
						r={DOT_RADIUS}
						fill="white"
						stroke="#CECECE"
						strokeWidth="1"
					/>
				</svg>
			)}
		</div>
	);
};

export default TrackNodes;
