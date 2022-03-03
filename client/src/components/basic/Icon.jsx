import classNames from 'classnames';
import { Button } from './Button';

const Icon = ({ className, ...props }) => {
    return (
        <i className={classNames('fa', className)} {...props}></i>
    )
}

export const IconButton = ({ icon, text = '', ...props }) => {
    return (
        <Button {...props}>
            <Icon className={icon} />
            {text && <span style={{ marginLeft: '5px' }}>{text}</span>}
        </Button>
    )
}

export default Icon;
