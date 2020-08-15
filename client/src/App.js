import React, { useState, useEffect } from 'react';
import Title from './Components/Title/Title.js';
import SelectionBar from './Components/SelectionBar/SelectionBar.js';
import InfoBar from './Components/InfoBar/InfoBar.js';
import NewLaunchButton from './Components/NewLaunchButton/NewLaunchButton.js';
import SearchLaunchInput from './Components/SearchLaunchInput/SearchLaunchInput.js';
import LaunchList from './Components/LaunchList/LaunchList.js';
import ModalForm from './Components/ModalForm/ModalForm.js';

import { formatDateToYearMonth } from './Helpers/formatHelpers.js';

import * as APIServices from './services/transactionService.js';

export default function App() {
  const [allPeriods, setAllPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [launchCount, setLaunchCount] = useState(0);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [searchLaunchText, setSearchLaunchText] = useState('');
  const [selectedLaunch, setSelectedLaunch] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  // efeito que inicializa os states 'allPeriods' e 'SelectedPeriod'
  useEffect(() => {
    // inicia o estado 'allPeriods' com base em uma pesquisa no banco de dados
    async function initAllPeriods() {
      let periods = await APIServices.getAllPeriods();
      if (!periods.allPeriods.includes(selectedPeriod) && selectedPeriod) {
        periods.allPeriods.push(selectedPeriod);
      }
      setAllPeriods(periods.allPeriods);
    }

    // inicia o estado 'selectedPeriod' com o anoMês de hoje
    function initSelectedPeriod() {
      // efeito para iniciar o state 'selectedPeriod'
      let today = formatDateToYearMonth(new Date());
      setSelectedPeriod(today);
    }

    (async () => {
      initSelectedPeriod();
      await initAllPeriods();
    })();
  }, []);

  // efeito que atualiza os lançamentos quando o período muda
  useEffect(() => {
    // adiciona o período selecionado na lista de períodos caso ele não esteja lá
    function addNewPeriod(periodsList) {
      if (!periodsList.includes(selectedPeriod) && selectedPeriod) {
        periodsList.push(selectedPeriod);
      }
    }

    (async () => {
      await handleLaunchChange(true);
      addNewPeriod(allPeriods);
    })();
  }, [selectedPeriod]);

  // efeito que atualiza o 'filteredLaunches' com base na pesquisa do input
  useEffect(() => {
    // filtra os lançamentos com base no input. Se searchLaunchText for '',
    // deve puxar o getAllTransactions
    async function filterLaunches() {
      let filteredLaunchesSearch =
        searchLaunchText === ''
          ? await APIServices.getAllTransactions(selectedPeriod)
          : await APIServices.getTransactionByDescription(
              selectedPeriod,
              searchLaunchText
            );

      updateLaunchStates(filteredLaunchesSearch);
    }

    (async () => {
      await filterLaunches();
    })();
  }, [searchLaunchText]);

  // busca os lançamentos do novo período e atualiza os estados depois de 1.5 segundos
  async function handleLaunchChange(immediately = false) {
    if (immediately) {
      let launchInfo = await APIServices.getAllTransactions(selectedPeriod);
      updateLaunchStates(launchInfo);
      return;
    }
    setTimeout(async () => {
      let launchInfo = await APIServices.getAllTransactions(selectedPeriod);
      updateLaunchStates(launchInfo);
    }, 300);
  }

  // atualiza os estados 'launchCount' e 'filteredLaunches'
  function updateLaunchStates(launchesObject) {
    const { results: launchArray, length: launchCounted } = launchesObject;
    setFilteredLaunches(sortByDay(launchArray));
    setLaunchCount(launchCounted);
  }

  // ordena de forma crescente os lançamentos por dia do mês
  function sortByDay(launches) {
    launches.sort(({ day: a }, { day: b }) => {
      return a - b;
    });
    return launches;
  }

  // volta o estado 'selectedPeriod' em um mês
  const goBackPeriod = async () => {
    let previousMonth = new Date(`${selectedPeriod} UTC-0300`);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    previousMonth = formatDateToYearMonth(previousMonth);
    if (allPeriods.includes(previousMonth)) {
      setSelectedPeriod(previousMonth);
      setSearchLaunchText('');
    } else {
      setSelectedPeriod(selectedPeriod);
    }
  };

  // avança o estado 'selectedPeriod' em um mês
  const goAheadPeriod = () => {
    let nextMonth = new Date(`${selectedPeriod} UTC-0300`);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth = formatDateToYearMonth(nextMonth);
    if (allPeriods.includes(nextMonth)) {
      setSelectedPeriod(nextMonth);
      setSearchLaunchText('');
    } else {
      setSelectedPeriod(selectedPeriod);
    }
  };

  //
  const handleClickNewLaunchButton = () => {
    setModalType('new');
    setIsModalOpen(true);
  };

  const handleChangeSearchLaunchInput = (newSearch) => {
    setSearchLaunchText(newSearch);
  };

  const handleChangeSelectedPeriod = (newSelectedPeriod) => {
    setSelectedPeriod(newSelectedPeriod);
  };

  const handleClickEditLaunchButton = async (id) => {
    console.log(`chama a janela de edição do lançamento ${id}`);
    setModalType('edit');
    let launchInfo = await APIServices.getTransactionByID(id);
    setSelectedLaunch(launchInfo.results);
    setIsModalOpen(true);
  };

  const handleClickDeleteLaunchButton = async (id) => {
    console.log(`chama a janela de exclusão do lançamento ${id}`);
    let launchInfo = await APIServices.getTransactionByID(id);
    setSelectedLaunch(launchInfo.results);

    setModalType('delete');
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Title>
        <b>Bootcamp Fullstack - Desafio Final</b>
      </Title>
      <Title>Controle Financeiro Pessoal</Title>
      <SelectionBar
        periods={allPeriods}
        selected={selectedPeriod}
        propGoBack={goBackPeriod}
        propGoAhead={goAheadPeriod}
        propHandleChangeSelected={handleChangeSelectedPeriod}
      />
      <InfoBar launchCount={launchCount} launchArray={filteredLaunches} />

      <div className="flexRow">
        <NewLaunchButton propHandleClick={handleClickNewLaunchButton} />
        <SearchLaunchInput
          value={searchLaunchText}
          propOnChange={handleChangeSearchLaunchInput}
        />
      </div>
      <LaunchList
        launches={filteredLaunches}
        propEditButton={handleClickEditLaunchButton}
        propDeleteButton={handleClickDeleteLaunchButton}
      />
      <ModalForm
        show={isModalOpen}
        reloadLaunches={handleLaunchChange}
        hideModal={() => {
          setIsModalOpen(false);
          setSelectedLaunch({});
        }}
        type={modalType}
        launch={selectedLaunch}
      />
    </div>
  );
}
