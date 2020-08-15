import React, { useState, useEffect } from 'react';
import { formatToRealCurrency } from '../../Helpers/formatHelpers';

export default function DeleteLaunchForm({ propOnSubmit, launch, hideModal }) {
  function handleSubmit(e) {
    e.preventDefault();
    propOnSubmit(launch._id);
  }

  return (
    <form id="deleteForm" onSubmit={handleSubmit}>
      <div id="formHeader" style={styles.flexRow}>
        <span className="right" style={styles.title}>
          Exclusão de lançamento
        </span>
        <button type="button" className="btn red lighten-1" onClick={hideModal}>
          <i className="material-icons">close</i>
        </button>
      </div>
      <div id="formContent" style={styles.formContent}>
        <p
          className="center"
          style={{ fontSize: '1.25rem', margin: 0, marginBottom: '1rem' }}
        >
          Tem certeza que deseja excluir o lançamento abaixo?
        </p>
        <div
          style={{
            ...styles.flexRow,
            ...styles.justifyCenter,
            borderRadius: '8px',
            padding: '0.5rem',
          }}
          className="grey lighten-4"
        >
          <div>
            <label>Descrição</label>
            <p style={{ marginTop: 0 }}>
              <b>{launch.description}</b>
            </p>
          </div>
          <div style={{marginLeft:"0.2rem"}}>
            <label>Categoria</label>
            <p style={{ marginTop: 0 }}>
              <b>{launch.category}</b>
            </p>
          </div>
        </div>

        {/* BOTÕES SIM e CANCELAR */}
        <button type="submit" className="btn right red lighten-2">
          SIM
        </button>
        <button type="button" onClick={hideModal} className="btn left grey ">
          CANCELAR
        </button>
      </div>
    </form>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  justifyCenter: {
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  radioLabel: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  formContent: {
    border: '1px solid #BDBDBD',
    borderRadius: '5px',
    padding: '1.75rem 1rem',
  },
};
