export const portfolioData = {
  name: 'Anthony Fuca',
  portrait: './images/me.jpeg',
  tagline: 'Software Developer & Full-Stack Engineer',
  location: 'Toronto, ON',
  bio: [
    "Hi I’m Anthony, a software engineer specializing in full-stack development, with a background in integrating practical AI into real-world workflows. I am currently a student studying both computer science and business at the University of Waterloo and Wilfrid Laurier University."
  ],
  links: {
    github: 'https://github.com/ajfuca4',
    linkedin: 'https://linkedin.com/in/ajfuca',
    email: 'mailto:ajfuca+portfolio@gmail.com',
    resume: '/Anthony%20Fuca%20Resume.pdf',
  },
  projects: [
    {
      id: 'resume',
      title: 'ResUme',
      description:
        'ResUme is a local desktop editor for tailoring a one-page LaTeX resume to each application. You write your experience once, in your own words, then turn sections and bullets on or off so the PDF includes only what fits that role.',
      image:
        './images/resume.png',
      technologies: ['python', 'LaTeX'],
      URL: 'https://github.com/anthonyfuca',
    },
    {
      id: 'gradestar',
      title: 'GradeStar',
      description:
        'GradeStar is a personal academic dashboard for university students who need a clearer way to follow complex syllabus weights. It gives them a clean interface to construct and keep track of those grading schemes, with a grade indicator, a monthly calendar of deadlines for each course and more to come',
      image:
        './images/gradestar.png',
      technologies: ['javascript', 'nodejs', 'expressjs', 'mongodb', 'html5', 'css3'],
      URL: 'https://github.com/ajfuca4/GradeStar',
    },
    {
      id: 'runster',
      title: 'Runster',
      description:
        'Runster is a Kotlin/Jetpack Compose Android app that turns your Strava or manually logged runs into progress for a virtual monster that levels up as you hit your running goals. It\'s backed by Supabase, uses Groq AI to write the monster\'s motivational messages, and has friends and running challenges.',
      image:
        './images/runster.png',
      technologies: ['kotlin', 'jetpackcompose', 'supabase', 'groq'],
      URL: 'https://github.com/ajfuca4/Runster',
    },
    {
      id: 'force-capture-chess-engine',
      title: 'Forced Capture Chess Engine',
      description:
        'This project is a modified Stockfish chess engine built to play a variant in which a capture is required whenever one is legal. When a capture is available, the engine ignores every non-capturing move and searches only among captures, then plays the line it judges best. It can compete through XBoard as well as UCI.',
      image:
        './images/forceCaptureChess.png',
      technologies: ['cpp'],
      URL: 'https://github.com/ajfuca4/Forced-Capture-Chess',
    }
  ],
};
