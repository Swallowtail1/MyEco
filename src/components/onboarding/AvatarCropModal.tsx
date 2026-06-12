import React, { useEffect, useMemo, useRef, useState } from 'react';

type AvatarCropModalProps = {
	open: boolean;
	imageSrc: string | null;
	onClose: () => void;
	onSave: (croppedBlob: Blob, previewUrl: string) => void;
};

type Point = { x: number; y: number };

const TARGET_SIZE = 320;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export default function AvatarCropModal({ open, imageSrc, onClose, onSave }: AvatarCropModalProps) {
	const imageRef = useRef<HTMLImageElement | null>(null);
	const cropBoxRef = useRef<HTMLDivElement | null>(null);
	const dragState = useRef<{ start: Point; base: Point } | null>(null);

	const [loaded, setLoaded] = useState(false);
	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
	const [natural, setNatural] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

	const imageStyle = useMemo(
		() => ({
			transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${zoom})`,
			transformOrigin: 'center center',
		}),
		[position.x, position.y, zoom]
	);

	useEffect(() => {
		if (!open) return;
		setLoaded(false);
		setZoom(1);
		setPosition({ x: 0, y: 0 });
	}, [open, imageSrc]);

	const handleImageLoad = () => {
		const img = imageRef.current;
		if (!img) return;
		setNatural({ width: img.naturalWidth, height: img.naturalHeight });
		setLoaded(true);
	};

	const clampPosition = (next: Point) => {
		const box = cropBoxRef.current;
		const img = imageRef.current;
		if (!box || !img || !natural.width || !natural.height) return next;

		const boxRect = box.getBoundingClientRect();
		const baseWidth = boxRect.width;
		const baseHeight = boxRect.height;
		const scaledWidth = baseWidth * zoom;
		const scaledHeight = (natural.height / natural.width) * baseWidth * zoom;

		const limitX = Math.max(0, (scaledWidth - baseWidth) / 2);
		const limitY = Math.max(0, (scaledHeight - baseHeight) / 2);

		return {
			x: Math.min(limitX, Math.max(-limitX, next.x)),
			y: Math.min(limitY, Math.max(-limitY, next.y)),
		};
	};

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!loaded) return;
		dragState.current = { start: { x: e.clientX, y: e.clientY }, base: position };
		(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!dragState.current) return;
		const dx = e.clientX - dragState.current.start.x;
		const dy = e.clientY - dragState.current.start.y;
		setPosition(clampPosition({ x: dragState.current.base.x + dx, y: dragState.current.base.y + dy }));
	};

	const stopDrag = () => {
		dragState.current = null;
	};

	const handleSave = async () => {
		const img = imageRef.current;
		const box = cropBoxRef.current;
		if (!img || !box || !imageSrc) return;

		const boxRect = box.getBoundingClientRect();
		const canvas = document.createElement('canvas');
		canvas.width = TARGET_SIZE;
		canvas.height = TARGET_SIZE;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const baseWidth = boxRect.width;
		const displayWidth = baseWidth * zoom;
		const displayHeight = (img.naturalHeight / img.naturalWidth) * baseWidth * zoom;

		const offsetX = (displayWidth - baseWidth) / 2 - position.x;
		const offsetY = (displayHeight - baseWidth) / 2 - position.y;

		const sx = (offsetX / displayWidth) * img.naturalWidth;
		const sy = (offsetY / displayHeight) * img.naturalHeight;
		const sWidth = (baseWidth / displayWidth) * img.naturalWidth;
		const sHeight = (baseWidth / displayWidth) * img.naturalHeight;

		ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, TARGET_SIZE, TARGET_SIZE);

		const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
		if (!blob) return;

		const previewUrl = URL.createObjectURL(blob);
		onSave(blob, previewUrl);
		onClose();
	};

	if (!open) return null;

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Crop profile picture"
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 50,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'rgba(0,0,0,0.6)',
				padding: 16,
			}}
			onClick={onClose}
		>
			<div
				style={{
					width: 'min(92vw, 520px)',
					background: '#fff',
					borderRadius: 16,
					boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
					overflow: 'hidden',
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<div style={{ padding: 16, borderBottom: '1px solid #e5e7eb' }}>
					<h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Crop profile picture</h2>
					<p style={{ margin: '6px 0 0', fontSize: 13, color: '#6b7280' }}>
						Drag to reposition, then zoom to fit your face inside the circle.
					</p>
				</div>

				<div style={{ padding: 16 }}>
					<div
						ref={cropBoxRef}
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={stopDrag}
						onPointerCancel={stopDrag}
						onPointerLeave={stopDrag}
						style={{
							width: '100%',
							aspectRatio: '1 / 1',
							borderRadius: '50%',
							overflow: 'hidden',
							position: 'relative',
							background: '#f3f4f6',
							cursor: loaded ? 'grab' : 'default',
							userSelect: 'none',
						}}
					>
						{imageSrc ? (
							<img
								ref={imageRef}
								src={imageSrc}
								alt="Crop source"
								onLoad={handleImageLoad}
								draggable={false}
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									...imageStyle,
									pointerEvents: 'none',
								}}
							/>
						) : null}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.9)',
								borderRadius: '50%',
								pointerEvents: 'none',
							}}
						/>
					</div>

					<div style={{ marginTop: 16 }}>
						<label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
							Zoom
						</label>
						<input
							type="range"
							min={MIN_ZOOM}
							max={MAX_ZOOM}
							step={0.01}
							value={zoom}
							onChange={(e) => {
								const nextZoom = Number(e.target.value);
								setZoom(nextZoom);
								setPosition((current) => clampPosition(current));
							}}
							style={{ width: '100%' }}
						/>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 8,
						padding: 16,
						borderTop: '1px solid #e5e7eb',
					}}
				>
					<button
						type="button"
						onClick={onClose}
						style={{
							padding: '10px 14px',
							borderRadius: 10,
							border: '1px solid #d1d5db',
							background: '#fff',
							cursor: 'pointer',
						}}
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleSave}
						disabled={!imageSrc}
						style={{
							padding: '10px 14px',
							borderRadius: 10,
							border: 'none',
							background: imageSrc ? '#111827' : '#9ca3af',
							color: '#fff',
							cursor: imageSrc ? 'pointer' : 'not-allowed',
						}}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
