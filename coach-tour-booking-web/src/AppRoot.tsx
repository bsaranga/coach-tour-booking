import { useEffect, useState } from 'react';
import './App.css'
import AppHeader from './components/AppHeader/AppHeader';
import Navigation from './components/Navigation/Navigation';
import IViewState from './interfaces/AppState/IViewState';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
import "./pages/Pages.css"

function App() {
  
  const [viewState, setViewState] = useState<IViewState>({
    isDesktop: true,
    isMobile: false,
    isTablet: false,
  })

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 991px)');
    const desktopQuery = window.matchMedia('(min-width: 992px)');

    // Add event listeners to handle changes in viewport size
    mobileQuery.addEventListener("change", handleMobileChange);
    tabletQuery.addEventListener("change", handleTabletChange);
    desktopQuery.addEventListener("change", handleDesktopChange);

    setViewState(() => {
      return {
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
      }
    })

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      tabletQuery.removeEventListener('change', handleTabletChange);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    }

  }, []);

  function handleMobileChange(event: MediaQueryListEvent) {
    const mql = event.currentTarget as MediaQueryList;
    setViewState(vs => {
      return {
        ...vs,
        isMobile: mql.matches,
      }
    })
  }

  function handleTabletChange(event: MediaQueryListEvent) {
    const mql = event.currentTarget as MediaQueryList;
    setViewState(vs => {
      return {
        ...vs,
        isTablet: mql.matches,
      }
    })
  }

  function handleDesktopChange(event: MediaQueryListEvent) {
    const mql = event.currentTarget as MediaQueryList;
    setViewState(vs => {
      return {
        ...vs,
        isDesktop: mql.matches,
      }
    })
  }

  return (
    <div className="main_container">
      <AppHeader/>
      <div className="content_area">
        <Navigation viewState={viewState} />
        <div className='app_view'>
          <Outlet/>
        </div>
      </div>
      <div className='footer_area'>
        <Typography variant='caption' color={'grey'} fontSize={viewState.isMobile ? 6 : viewState.isTablet ? 8 : 10} align='center'>
          © 2022 EU Coach Travel. All rights reserved. Prices subject to change according to prevailing exchange rates. All journeys subject to local traffic conditions and regulations. ID verification required for travel. Service may change due to unforeseen circumstances. EU Coach Travel complies with GDPR and related European Union privacy legislation.
        </Typography>
      </div>
    </div>
  );
}

export default App;