import { useEffect, useState } from 'react';

const resumeVersions = [
  { id: 'engineering', label: 'Engineering', file: '/resumes/RESUME.pdf' },
  { id: 'writing-media', label: 'Writing & media', file: '/resumes/26JRESUME.pdf' },
];

function ResumeEntry({ organization, location, role, dates, children }) {
  return (
    <article className="resume-entry">
      <div className="resume-entry-heading">
        <h3>{organization}</h3>
        <span>{location}</span>
      </div>
      <div className="resume-entry-subheading">
        <p>{role}</p>
        <span>{dates}</span>
      </div>
      {children}
    </article>
  );
}

function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      <div className="resume-section-content">{children}</div>
    </section>
  );
}

function ResumePage() {
  const [version, setVersion] = useState('engineering');
  const isEngineering = version === 'engineering';
  const selectedVersion = resumeVersions.find(({ id }) => id === version);

  return (
    <main className="resume-page">
      <a className="home-back resume-back" href="#home" aria-label="Back to home"><span aria-hidden="true">↖</span> home</a>
      <header className="resume-toolbar">
        <div>
          <p className="resume-kicker">Kelly Ryoo <span>/</span> Resume</p>
          <h1>Resume</h1>
        </div>
        <div className="resume-actions">
          <div className="resume-switch" role="group" aria-label="Choose resume version">
            {resumeVersions.map(({ id, label }) => (
              <button
                aria-pressed={version === id}
                key={id}
                onClick={() => setVersion(id)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <a className="resume-download" href={selectedVersion.file} download>
            Download PDF <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <article className="resume-document" aria-label={`${selectedVersion.label} resume`}>
        <header className="resume-contact">
          <h2>Kelly Ryoo</h2>
          <address>
            <span>New York, NY</span>
            <a href="tel:+16692715044">669-271-5044</a>
            <a href="mailto:ryoo.kellyy@gmail.com">ryoo.kellyy@gmail.com</a>
            <a href="https://linkedin.com/in/kelly-ryoo" target="_blank" rel="noreferrer">LinkedIn</a>
          </address>
        </header>

        {isEngineering ? (
          <>
            <ResumeSection title="Education">
              <ResumeEntry organization="Cornell University, College of Arts and Sciences" location="Ithaca, NY" role="Bachelor of Arts in Computer Science, Literatures in English" dates="May 2024">
                <p>GPA: 3.8/4.0 (Dean’s List)</p>
                <p>Coursework: Analysis of Algorithms, Intro to Artificial Intelligence, Intro to Machine Learning, Language and Information, Operating Systems, Computer System Organization and Programming, Functional Programming, Discrete Structures, Object Oriented Programming and Data Structures</p>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Experience">
              <ResumeEntry organization="Cisco Systems" location="New York, NY" role="Software Engineer" dates="September 2024 – Present">
                <ul>
                  <li>Engineered an end-to-end agentic AI NL2SQL pipeline (LangGraph, LLM, Python) with custom prompt engineering to help 20K+ company sellers query business data without SQL knowledge, with automated retry and LLM-driven query correction on failure.</li>
                  <li>Built a RAG-backed context pipeline for the NL2SQL system using pgvector similarity search over a PostgreSQL knowledge base of schemas, business glossary, and example queries, with Redis for conversational memory.</li>
                  <li>Designed MCP servers and a Python REST wrapper API around Helios, an internal AI assistant, enabling engineering teams to build and extend custom chatbot applications on top of existing AI infrastructure.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Cornell University" location="Ithaca, NY" role="Teaching Assistant" dates="January – May 2024">
                <ul>
                  <li>Supported 100+ students in CS 4300 (Language and Information); hosted weekly office hours, assessed homeworks and final projects, advised and mentored a team of students about information retrieval systems (Python) and web development.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Cisco Systems" location="San Jose, CA" role="Software Engineering Intern" dates="June – August 2023">
                <ul>
                  <li>Analyzed lower-level forecast data and built out two machine learning models (Linear Regression, Neural Network) in Python and TensorFlow to predict company-wide earnings and improve forecasting process.</li>
                  <li>Automated product test cases for NGF using Cucumber and Selenium, writing 26 scenarios, 11 step definitions, and 18 Java functions, thereby reducing manual testing effort significantly.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="McMahon Lab" location="Ithaca, NY" role="Undergraduate Researcher" dates="January – October 2021">
                <ul>
                  <li>Programmed lab laser instruments with Python to enable experiments and collection of data.</li>
                  <li>Formulated experiments with the RSA (Real Time Spectrum Analyzer) machine and wrote Python code to collect data during swept mode.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="University of Missouri" location="Columbia, MO" role="Research Intern" dates="May – July 2021">
                <ul>
                  <li>Conducted literature reviews of 10 research papers about bed sensors and sleep data machine learning algorithms.</li>
                  <li>Collaborated with two other interns to design and program a deep learning (CNN-LSTM hybrid) model that classifies polysomnography data, achieving a noninvasive solution to monitor sleep quality and related disorders.</li>
                  <li>Attained an 85% accuracy rate using PyTorch to preprocess, extract features, and classify sleep stages.</li>
                </ul>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Projects">
              <ResumeEntry organization="Plant Pals" location="" role="" dates="Spring 2023">
                <ul>
                  <li>Designed and programmed an online information retrieval system that allows users to query plant information.</li>
                  <li>Implemented Jaccard similarity, Cosine similarity, and Rocchio’s relevance feedback algorithms in Python.</li>
                  <li>Built the front-end layout and website features using HTML, CSS, and JavaScript.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Podcast Website" location="" role="" dates="Summer 2021">
                <ul>
                  <li>Designed the website layout, user interface, and visual graphics for the podcast “Learn Korean and Korean Culture” to serve over 90,000 listeners, then programmed the website using React, HTML, CSS, and Bootstrap.</li>
                </ul>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Skills & interests">
              <p><strong>Programming:</strong> Python, Java, SQL (Oracle, PostgreSQL), JavaScript, React, HTML/CSS, C, OCaml, R</p>
              <p><strong>Tools & skills:</strong> LangGraph, LangChain, FastAPI, REST APIs, Flask, vector search, Redis, Git, Selenium, Cucumber, PyTorch, Bootstrap, Anthropic, OpenAI, NLP, Agile, RAG, LLM</p>
              <p><strong>Interests:</strong> AI and technology policy, large language models, digital humanities, literature, social impacts of tech</p>
            </ResumeSection>
          </>
        ) : (
          <>
            <ResumeSection title="Education">
              <ResumeEntry organization="Cornell University, College of Arts and Sciences" location="Ithaca, NY" role="Bachelor of Arts in Computer Science, Literatures in English" dates="May 2024">
                <p>GPA: 3.8/4.0 (Dean’s List)</p>
                <p>Coursework: Intro to Artificial Intelligence, Intro to Machine Learning, Language and Information, Analysis of Algorithms</p>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Writing & media">
              <ResumeEntry organization="State of the Pod" location="Ithaca, NY" role="Writer and Host" dates="August 2021 – May 2023">
                <ul>
                  <li>Co-wrote, produced, and hosted episodes for a student-run tech and science podcast, collaborating with a team of two in a professional podcast studio.</li>
                  <li>Researched and reported on AI topics including generative art, creative authorship, and AI language and humor for a public audience.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Guac Magazine" location="Ithaca, NY" role="Staff Writer" dates="August 2022 – May 2024">
                <ul>
                  <li>Wrote and revised travel and culture articles covering East Asia, Europe, and beyond through the full editorial process, from pitching to print and digital (Medium) publication.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Creme de Cornell" location="Ithaca, NY" role="Editor" dates="January 2022 – May 2024">
                <ul>
                  <li>Edited food and cooking stories for grammar, style, and flow; worked directly with writers to develop and refine pitches in line with magazine standards.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Learn Korean and Korean Culture Podcast" location="Remote" role="Creator, Host, Producer" dates="August 2020 – November 2021">
                <ul>
                  <li>Independently researched, scripted, recorded, edited, and published a podcast that grew to 90,000+ listeners across platforms, maintaining a 4.9 star-rating on Spotify with nearly 200 reviews.</li>
                  <li>Designed and coded the companion website from scratch using Figma, React, HTML, CSS, and Bootstrap.</li>
                  <li>Produced supplementary educational materials (vocabulary lists, resource guides) and managed all marketing and distribution.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Gatty Rewind Podcast, Cornell Southeast Asia Program" location="Ithaca, NY" role="Producer" dates="August 2023 – May 2024">
                <ul>
                  <li>Managed end-to-end podcast production including recording, audio editing in Adobe Audition, and mic setup.</li>
                  <li>Wrote episode descriptions and created promotional and marketing materials in Figma.</li>
                  <li>Collaborated closely with the host to develop episode concepts and maintain consistent editorial voice.</li>
                </ul>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Skills & interests">
              <p><strong>Programming:</strong> Python, Java, SQL (Oracle, PostgreSQL), JavaScript, React, HTML/CSS, C, OCaml, R, LangGraph, FastAPI, REST APIs, Flask, vector search, Redis, Git, Selenium, Cucumber, PyTorch, Bootstrap, Anthropic, OpenAI, NLP, Agile, RAG, LLM</p>
              <p><strong>Media & design:</strong> Adobe Audition, Adobe Lightroom, Figma, podcast production, scripting, web publishing</p>
              <p><strong>Interests:</strong> AI and technology policy, large language models, digital humanities, literature, social impacts of tech</p>
            </ResumeSection>
          </>
        )}
      </article>
    </main>
  );
}

export default ResumePage;
