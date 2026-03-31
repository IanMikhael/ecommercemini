const LeafAccent = ({ className }) => (
    <svg viewBox="0 0 80 120" className={className} fill="currentColor">
        <path
            d="M40 110 C40 110 10 80 10 50 C10 20 25 5 40 5 C55 5 70 20 70 50 C70 80 40 110 40 110Z"
            opacity="0.15"
        />
        <path d="M40 110 L40 5" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
        <path d="M40 40 C25 35 15 25 12 15" stroke="currentColor" strokeWidth="0.8" opacity="0.2" fill="none" />
        <path d="M40 40 C55 35 65 25 68 15" stroke="currentColor" strokeWidth="0.8" opacity="0.2" fill="none" />
        <path d="M40 65 C22 58 14 45 11 32" stroke="currentColor" strokeWidth="0.8" opacity="0.2" fill="none" />
        <path d="M40 65 C58 58 66 45 69 32" stroke="currentColor" strokeWidth="0.8" opacity="0.2" fill="none" />
    </svg>
);

export default LeafAccent;
