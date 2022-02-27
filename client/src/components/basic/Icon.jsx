import classNames from 'classnames';
import 'styled-components';

const Icon = ({ className, ...props }) => {
    return (
        <i className={classNames('fa', className)} {...props}></i>
    )
}

export default Icon;
