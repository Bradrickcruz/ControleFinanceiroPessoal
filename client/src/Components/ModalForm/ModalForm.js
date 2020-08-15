import React, { useEffect } from 'react';
import Modal from 'react-modal';

import NewLaunchForm from '../NewLaunchForm/NewLaunchForm';
import EditLaunchForm from '../EditLaunchForm/EditLaunchForm';
import DeleteLaunchForm from '../DeleteLaunchForm/DeleteLaunchForm';

import * as APIServices from '../../services/transactionService';

Modal.setAppElement('#root');

export default function ModalForm({
  show,
  reloadLaunches,
  hideModal,
  type,
  launch,
}) {
  // efeito para ativar e desativar o evento de tecla pressionada
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        hideModal();
      }
    }

    //DidMount
    document.addEventListener('keydown', handleKeyDown);

    // WillUnmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleNewLaunchSubmit(newLaunchObject) {
    APIServices.createNewTransaction(newLaunchObject);
    hideModal();
    reloadLaunches();
  }

  function handleEditLaunchSubmit(editedLaunchObject) {
    APIServices.updateTransaction(editedLaunchObject._id, editedLaunchObject);
    hideModal();
    reloadLaunches();
  }

  function handleDeleteLaunchSubmit(deletedLaunchId) {
    console.log('submit delete Launch');
    APIServices.deleteTransaction(deletedLaunchId);
    hideModal();
    reloadLaunches();
  }

  const customModal = {
    new: {
      content: {
        top: '10vh',
        left: '34vw',
        right: '34vw',
        bottom: '12vh',
      },
    },
    edit: {
      content: {
        top: '10vh',
        left: '34vw',
        right: '34vw',
        bottom: '12vh',
      },
    },
    delete: {
      content: {
        top: '22vh',
        left: '34vw',
        right: '34vw',
        bottom: '22vh',
      },
    },
  };

  return (
    <Modal isOpen={show} style={customModal[type]}>
      {type === 'new' && (
        <NewLaunchForm
          propOnSubmit={handleNewLaunchSubmit}
          hideModal={hideModal}
        />
      )}
      {type === 'edit' && (
        <EditLaunchForm
          propOnSubmit={handleEditLaunchSubmit}
          hideModal={hideModal}
          launch={launch}
        />
      )}
      {type === 'delete' && (
        <DeleteLaunchForm
          propOnSubmit={handleDeleteLaunchSubmit}
          hideModal={hideModal}
          launch={launch}
        />
      )}
    </Modal>
  );
}
