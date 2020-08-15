import React, { useState, useEffect } from 'react';

export default function EditLaunchForm({ propOnSubmit, hideModal, launch }) {
  const [selectedLaunch, setSelectedLaunch] = useState(launch);

  useEffect(() => {
    if (selectedLaunch.type === '+') {
      document.getElementById('receita').checked = true;
    } else {
      document.getElementById('despesa').checked = true;
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    propOnSubmit(selectedLaunch);
  }

  function handleDescriptionInput({ target: { value } }) {
    setSelectedLaunch({ ...selectedLaunch, description: value });
  }

  function handleCategoryInput({ target: { value } }) {
    setSelectedLaunch({ ...selectedLaunch, category: value });
  }

  function handleCurrencyValueInput({ target: { value: inputValue } }) {
    setSelectedLaunch({ ...selectedLaunch, value: parseFloat(inputValue) });
  }

  function handleDateInput(e) {
    if (!e.target.value) {
      return;
    }
    const inputDate = e.target.value.split('-');

    const dataObj = {
      year: inputDate[0],
      month: inputDate[1],
      day: inputDate[2],
      yearMonth: `${inputDate[0]}-${inputDate[1]}`,
      yearMonthDay: `${inputDate[0]}-${inputDate[1]}-${inputDate[2]}`,
    };

    setSelectedLaunch({ ...selectedLaunch, ...dataObj });
  }

  return (
    <form id="editForm" onSubmit={handleSubmit}>
      <div id="formHeader" style={styles.flexRow}>
        <span className="right" style={styles.title}>
          Edição de lançamento
        </span>
        <button type="button" className="btn red lighten-1" onClick={hideModal}>
          <i className="material-icons">close</i>
        </button>
      </div>
      <div id="formContent" style={styles.formContent}>
        <div
          id="radio-buttons"
          style={{ ...styles.flexRow, ...styles.justifyCenter }}
        >
          <label>
            <input
              id="despesa"
              className="with-gap"
              name="launchType"
              type="radio"
              value="-"
              disabled
            />
            <span style={{ ...styles.radioLabel, color: 'var(--red)' }}>
              Despesa
            </span>
          </label>
          <label>
            <input
              id="receita"
              className="with-gap"
              name="launchType"
              type="radio"
              value="+"
              disabled
            />
            <span style={{ ...styles.radioLabel, color: 'var(--green)' }}>
              Receita
            </span>
          </label>
        </div>

        <label className="input-field">
          Descrição:
          <input
            type="text"
            onChange={handleDescriptionInput}
            value={selectedLaunch.description}
          />
        </label>

        <label className="input-field">
          categoria:
          <input
            type="text"
            onChange={handleCategoryInput}
            value={selectedLaunch.category}
          />
        </label>

        <div
          id="value-date"
          style={{
            ...styles.flexRow,
            justifyContent: 'space-between',
          }}
        >
          <label className="input-field" style={{ width: '8rem' }}>
            valor:
            <input
              type="number"
              min={0.0}
              step={0.01}
              onChange={handleCurrencyValueInput}
              value={selectedLaunch.value}
            />
          </label>

          <label className="input-field">
            Data:
            <input
              id="date"
              type="date"
              onChange={handleDateInput}
              value={selectedLaunch.yearMonthDay}
            />
          </label>
        </div>

        {/* BOTÃO salvar */}
        <button type="submit" className="btn right">
          Salvar
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
