const Input = ({ forwardedRef, ...props }) => (
    <input ref={forwardedRef} {...props} />
)

export default Input