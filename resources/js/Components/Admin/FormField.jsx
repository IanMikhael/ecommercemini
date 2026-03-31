export default function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    required,
    options = [],
    rows = 4,
    prefix,
    min,
    max,
    step,
    disabled,
    className = "",
    hint,
    imagePreview,
}) {
    const inputClasses = `form-input ${error ? "error" : ""} ${prefix ? "prefix-input" : ""} ${type === "select" ? "form-select" : ""} ${type === "textarea" ? "form-textarea" : ""} ${className}`;

    const renderInput = () => {
        if (type === "select") {
            return (
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputClasses}
                    disabled={disabled}
                >
                    {options.map((opt) =>
                        typeof opt === "object" ? (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ) : (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        )
                    )}
                </select>
            );
        }

        if (type === "textarea") {
            return (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputClasses}
                    placeholder={placeholder}
                    rows={rows}
                    disabled={disabled}
                />
            );
        }

        if (type === "checkbox") {
            return (
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        disabled={disabled}
                    />
                    <span>{label}</span>
                </label>
            );
        }

        if (type === "number") {
            return (
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(type === "number" && min !== undefined ? (parseFloat(e.target.value) || min) : e.target.value)}
                    className={inputClasses}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                />
            );
        }

        if (type === "url") {
            return (
                <>
                    <input
                        type="url"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={inputClasses}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                    {imagePreview && value && (
                        <div className="image-preview">
                            <img src={value} alt="Preview" onError={(e) => e.target.style.display = "none"} />
                        </div>
                    )}
                </>
            );
        }

        return (
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={inputClasses}
                placeholder={placeholder}
                disabled={disabled}
            />
        );
    };

    if (type === "checkbox") {
        return (
            <div className="form-group">
                {renderInput()}
                {error && <span className="form-error">{error}</span>}
            </div>
        );
    }

    return (
        <div className="form-group">
            <label className="form-label">
                {label}
                {required && <span style={{ color: "#dc2626" }}> *</span>}
            </label>
            {prefix ? (
                <div className="input-with-prefix">
                    <span className="input-prefix">{prefix}</span>
                    {renderInput()}
                </div>
            ) : (
                renderInput()
            )}
            {hint && !error && <span className="form-hint">{hint}</span>}
            {error && <span className="form-error">{error}</span>}
        </div>
    );
}
