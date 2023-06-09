type ButtonProps = {
    propFunction: () => void,
    propsButton: React.ReactElement;
    value: string,
}

const Button = (props: ButtonProps) => {

    const { propsButton, propFunction, value } = props;

    return <button onClick={propFunction} className={value}>{propsButton}</button>;
}

export default Button