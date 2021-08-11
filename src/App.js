import Head from './Head.js'
import About from './About.js'
import Education from './Education.js'
import Experience from './Experience.js'
import Extracurriculars from './Extracurriculars.js'
import Projects from './Projects.js'

function App() {
    return (
      <div>
        <div className="App">
          <div className="container-fluid">

              <div className="maxHundredVh">
              <Head></Head>
              <About></About>
              <Education></Education>
              </div>
              <Experience></Experience>
              <Extracurriculars></Extracurriculars>
              <Projects></Projects>

          </div>
        </div>

      </div>
    );
  }

  export default App;