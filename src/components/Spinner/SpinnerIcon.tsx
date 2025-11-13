export default function SpinnerIcon() {
	return (
		<svg viewBox="0 0 16 16">
			<mask id="spinner_mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="10" y="2" width="5" height="6">
				<path
					d="M10.8449 4.29983L12.0658 2.71565C13.6542 3.93977 14.6687 5.86353 14.6669 7.99999H12.6668C12.6683 6.50584 11.9607 5.15963 10.8449 4.29983Z"
					fill="url(#spinner_paint0_linear)"
				></path>
			</mask>
			<g mask="url(#spinner_mask0)">
				<rect x="0.666687" y="0.666664" width="14.6667" height="14.6667"></rect>
			</g>
			<mask id="spinner_mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="7" height="7">
				<path
					d="M8 12.6665C10.4671 12.6686 12.5297 10.736 12.6603 8.24397C12.6646 8.16225 12.6668 8.08091 12.6668 8H14.6669C14.6668 8.11562 14.6637 8.23186 14.6576 8.34864C14.471 11.9086 11.5244 14.6696 8 14.6666V12.6665Z"
					fill="url(#spinner_paint1_linear)"
				></path>
			</mask>
			<g mask="url(#spinner_mask1)">
				<rect x="0.666656" y="0.666664" width="14.6667" height="14.6667"></rect>
			</g>
			<mask id="spinner_mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="8" width="7" height="7">
				<path
					d="M7.75582 12.66C7.83762 12.6643 7.91903 12.6665 8.00001 12.6665V14.6666C7.88432 14.6665 7.76801 14.6634 7.65115 14.6573C4.09126 14.4707 1.33038 11.5243 1.33322 8H3.33327C3.33133 10.467 5.26392 12.5294 7.75582 12.66Z"
					fill="url(#spinner_paint2_linear)"
				></path>
			</mask>
			<g mask="url(#spinner_mask2)">
				<rect x="0.666687" y="0.666664" width="14.6667" height="14.6667"></rect>
			</g>
			<mask id="spinner_mask3" mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="1" width="9" height="7">
				<path
					d="M8.24429 3.33946C5.67049 3.20457 3.47467 5.1817 3.33978 7.7555C3.33549 7.8374 3.33333 7.91891 3.33327 7.99999H1.33322C1.33331 7.8842 1.33639 7.76779 1.34252 7.65083C1.53522 3.97397 4.67211 1.14951 8.34896 1.3422C8.90049 1.37111 9.32416 1.84164 9.29525 2.39317C9.26635 2.9447 8.79581 3.36837 8.24429 3.33946Z"
					fill="url(#spinner_paint3_linear)"
				></path>
			</mask>
			<g mask="url(#spinner_mask3)">
				<rect x="0.666687" y="0.666664" width="14.6667" height="14.6667"></rect>
			</g>
			<defs>
				<linearGradient
					id="spinner_paint0_linear"
					x1="12.6667"
					y1="7.99999"
					x2="10.6667"
					y2="2.66666"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopOpacity="0.08"></stop>
					<stop offset="1" stopOpacity="0"></stop>
				</linearGradient>
				<linearGradient
					id="spinner_paint1_linear"
					x1="8"
					y1="12.6667"
					x2="12.6667"
					y2="8"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopOpacity="0.35"></stop>
					<stop offset="1" stopOpacity="0.08"></stop>
				</linearGradient>
				<linearGradient
					id="spinner_paint2_linear"
					x1="3.33334"
					y1="8"
					x2="8.00001"
					y2="12.6667"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopOpacity="0.65"></stop>
					<stop offset="1" stopOpacity="0.35"></stop>
				</linearGradient>
				<linearGradient
					id="spinner_paint3_linear"
					x1="9.33334"
					y1="3.33333"
					x2="3.33334"
					y2="8"
					gradientUnits="userSpaceOnUse"
				>
					<stop></stop>
					<stop offset="1" stopOpacity="0.65"></stop>
				</linearGradient>
			</defs>
		</svg>
	);
}
