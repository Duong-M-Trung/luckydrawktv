import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {PageHeader, Button} from 'antd'

const Header = ({onAdd}) =>{

        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Task to do"
                    extra={[
                        <Button key="1" type="primary" onClick={onAdd}>
                            Thêm Task
                        </Button>
                    ]}
                />
            </div>
        );
}

Header.defaultProps = {
    title:'Task',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
