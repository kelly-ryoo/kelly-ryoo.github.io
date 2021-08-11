import Head from './Head.js'
import About from './About.js'
import Education from './Education.js'
import Experience from './Experience.js'
import Extracurriculars from './Extracurriculars.js'

function App() {
    return (
      <div>
        <div className="App">
          <div className="container-fluid">

              <div className="maxHundredVh">
              <Head className="section-0"></Head>
              <About className="section-1"></About>
              <Education className="section-2"></Education>
              </div>
              <Experience className="section-3"></Experience>
              <Extracurriculars className="section-4"></Extracurriculars>

          </div>
        </div>

      </div>
    );
  }

  export default App;