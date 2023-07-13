import { useEffect, useState } from 'react';
import './App.css'
import AppHeader from './components/AppHeader/AppHeader';
import Navigation from './components/Navigation/Navigation';
import IViewState from './interfaces/AppState/IViewState';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
import "./pages/Pages.css"
import { footerNotice } from './app_data/AllText';

function App() {
  
  const [viewState, setViewState] = useState<IViewState>({ screenSize: 'desktop'})

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 991px)');
    const desktopQuery = window.matchMedia('(min-width: 992px)');

    // Add event listeners to handle changes in viewport size
    mobileQuery.addEventListener("change", handleMobileChange);
    tabletQuery.addEventListener("change", handleTabletChange);
    desktopQuery.addEventListener("change", handleDesktopChange);

    setViewState(() => {
      return { screenSize: mobileQuery.matches ? 'mobile' : tabletQuery.matches ? 'tablet' : 'desktop'}
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
        screenSize: mql.matches ? 'mobile' : 'tablet'
      }
    })
  }

  function handleTabletChange(event: MediaQueryListEvent) {
    const mql = event.currentTarget as MediaQueryList;
    setViewState(vs => {
      return {
        screenSize: mql.matches ? 'tablet' : 'mobile'
      }
    })
  }

  function handleDesktopChange(event: MediaQueryListEvent) {
    const mql = event.currentTarget as MediaQueryList;
    setViewState(vs => {
      return {
        screenSize: mql.matches ? 'desktop' : 'tablet'
      }
    })
  }

  const footerFontSizes = {
    "desktop": 9,
    "tablet": 8,
    "mobile": 6
  }

  return (
    <div className="main_container">
      <AppHeader/>
      <div className="content_area">
        <Navigation viewState={viewState} />
        <div className='app_view'>
          <Outlet context={viewState as IViewState}/>
        </div>
      </div>
      <div className='footer_area'>
        <Typography variant='caption' color={'grey'} fontSize={footerFontSizes[viewState.screenSize]} align='center'>
          {footerNotice}
        </Typography>
      </div>
    </div>
  );
}

export default App;