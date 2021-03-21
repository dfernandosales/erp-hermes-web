import React from 'react'
import { useTabsNavigation, CrudRoute, CrudTabs } from '../../lib/CrudComponents'
import ReservaForm from './ReservaForm'
import ReservaQuartoList from '../reserva-quarto/ReservaQuartoList'
import ReservaQuartoForm from '../reserva-quarto/ReservaQuartoForm'
import ReservaHospedeList from '../reserva-hospede/ReservaHospedeList'
import ReservaHospedeForm from '../reserva-hospede/ReservaHospedeForm'


const ReservaFormTabs = () => {
    const tabsNavigation = useTabsNavigation({
        mainPath: "reserva",
        withPaper: false,
        tabs: [
          { value: "", label: "Reserva" },
          { value: "reservaHospedes", label: "Hospedes na Reserva" },
          { value: "reservaQuarto", label: "Quarto da Reserva" },
        ],
      });
    

  return (
    <CrudTabs {...tabsNavigation}>
        <CrudRoute render={props => <ReservaForm {...props} />} />
        <CrudRoute
        name="reservaQuarto"
        render={props => (
          <ReservaQuartoList
            onClickNew={tabsNavigation.toNewChild}
            onClickEdit={tabsNavigation.toEditChild}
            {...props}
          />
        )}
      />
      <CrudRoute
        name="reservaQuarto"
        isForm
        render={props => <ReservaQuartoForm {...props} />}
      />

<CrudRoute
        name="reservaHospedes"
        render={props => (
          <ReservaHospedeList
            onClickNew={tabsNavigation.toNewChild}
            onClickEdit={tabsNavigation.toEditChild}
            {...props}
          />
        )}
      />
      <CrudRoute
        name="reservaHospedes"
        isForm
        render={props => <ReservaHospedeForm {...props} />}
      />
      
      
    </CrudTabs>
  );
};

export default ReservaFormTabs;
