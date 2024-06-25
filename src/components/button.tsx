interface ButtonProps {
    onClick?: () => void;
    text: string;
    className?: string;
}

export function Button(props: ButtonProps): JSX.Element {
    return (
        <button
            className={props.className}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}