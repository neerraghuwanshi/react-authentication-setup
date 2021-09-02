import { useState } from "react"


const withModal = WrappedComponent => (props) => {

    const [modalVisible, setModalVisible] = useState(false)

    const showModal = () => {
        setModalVisible(true)
    }

    const hideModal = () => {
        setModalVisible(false)
    }

    return (
        <WrappedComponent
            modalVisible={modalVisible}
            showModal={showModal}
            hideModal={hideModal}>
            {props.children}
        </WrappedComponent>
    )
}


export default withModal