import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

class GenericModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isOpen: false };
    this.renderContentSection = this.renderContentSection.bind(this);
    this.renderFooterButtons = this.renderFooterButtons.bind(this);
  }

  renderContentSection() {
    return (
        <>
            <div>{this.props.content}</div>
        </>
    );
  }

  hasActionButton() {
    if (this.props.handleAction) {
      return (
          <Button
              variant="secondary"
              onClick={() => this.props.handleAction()}
              className="mr-1"
              disabled={!!this.props.actionDisabled}
          >
              {this.props.handleActionText}
          </Button>
      );
    }
    return null;
  }

  renderFooterButtons() {
    return (
        <>
            <Button variant="white" onClick={this.props.handleClose} className="mr-1">
                Close
            </Button>
            {this.hasActionButton()}
        </>
    );
  }

  renderTitle() {
    const { imageSrc, imageAlt, header } = this.props;
    if (imageSrc) {
      return (
          <>
              <Image className="ModalPhoto" src={imageSrc} alt={imageAlt} width='50' roundedCircle />
              {this.props.header}
          </>
      );
    }
    return header;
  }

  render() {
    const modelContentClass = this.props.centerModalContent ? 'ModalContent-centered' : '';
    return (
        <>
            <Modal
                show={this.props.handleOpen}
                size={this.props.size}
                onHide={this.props.handleClose}
                centered
                enforceFocus={false}
            >
                <Modal.Header className="ModalHeader">
                    <Modal.Title>{this.renderTitle()}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={modelContentClass}>{this.renderContentSection()}</Modal.Body>
                <Modal.Footer className="ModalFooter-centered">
                    <this.renderFooterButtons />
                </Modal.Footer>
            </Modal>
        </>
    );
  }
}

GenericModal.propTypes = {
  centerModalContent: PropTypes.bool,
  actionDisabled: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  handleAction: PropTypes.func,
  handleActionText: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  size: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string
};

GenericModal.defaultProps = { centerModalContent: false, imageSrc: '' };

export default GenericModal;
