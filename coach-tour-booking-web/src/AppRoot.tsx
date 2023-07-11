import { useEffect, useState } from 'react';
import './App.css'
import AppHeader from './components/AppHeader/AppHeader';
import Navigation from './components/Navigation/Navigation';
import IViewState from './interfaces/AppState/IViewState';

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
          App Area
          {
            viewState.isMobile ? ("MOBILE") : viewState.isTablet ? ("TABLET") : ("DESKTOP")
          }
        </div>
      </div>
      <div className='footer_area'>Footer</div>
    </div>
  );
}

export default App;