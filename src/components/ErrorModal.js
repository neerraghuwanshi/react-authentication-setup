import { Modal } from 'antd';
import { useSelector } from 'react-redux'


function ErrorModal(props) {

    const error = useSelector(state => state.auth.error)

    return (
        <Modal
            centered
            title={'Error'}
            footer={null}
            {...props}>
            <p>
                {error}
            </p>
        </Modal>
    )
}


export default ErrorModal