import { motion, useScroll, useTransform } from 'motion/react';
import bgImage from './assets/bg.jpeg';
import headImage from './assets/head.png';

const TRACKLIST = [
  { id: 1, title: 'Number One', features: '' },
  { id: 2, title: 'Dozdi Ni', features: '(ft Catchy beatz ft Young sudden)' },
  { id: 3, title: 'Dooset Daram', features: '' },
  { id: 4, title: 'Prada', features: '(ft Hiphopologist)' },
  { id: 5, title: 'Buggy', features: '' },
  { id: 6, title: 'Day One', features: '(ft Arown)' },
  { id: 7, title: 'Marde sal', features: '' },
  { id: 8, title: 'Tool keshid', features: '' },
  { id: 9, title: 'Rip', features: '' },
];

export default function App() {
  const { scrollY } = useScroll();

  // Background Parallax
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  // Head Parallax & Scale (Starts center, becomes a subtle logo at top)
  const headScale = useTransform(scrollY, [0, 600], [1, 0.35]);
  const headY = useTransform(scrollY, [0, 600], ["0vh", "-38vh"]);
  const headRotate = useTransform(scrollY, [0, 600], [0, 8]);
  const headOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  // Icons Scatter Effect
  const iconsOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const iconScale = useTransform(scrollY, [0, 300], [1, 0.5]);

  const icon1X = useTransform(scrollY, [0, 300], ["0vw", "-15vw"]);
  const icon1Y = useTransform(scrollY, [0, 300], ["0vh", "15vh"]);
  const icon1Rotate = useTransform(scrollY, [0, 300], [0, -45]);

  const icon2X = useTransform(scrollY, [0, 300], ["0vw", "-5vw"]);
  const icon2Y = useTransform(scrollY, [0, 300], ["0vh", "25vh"]);
  const icon2Rotate = useTransform(scrollY, [0, 300], [0, -15]);

  const icon3X = useTransform(scrollY, [0, 300], ["0vw", "5vw"]);
  const icon3Y = useTransform(scrollY, [0, 300], ["0vh", "25vh"]);
  const icon3Rotate = useTransform(scrollY, [0, 300], [0, 15]);

  const icon4X = useTransform(scrollY, [0, 300], ["0vw", "15vw"]);
  const icon4Y = useTransform(scrollY, [0, 300], ["0vh", "15vh"]);
  const icon4Rotate = useTransform(scrollY, [0, 300], [0, 45]);

  return (
    <div className="min-h-screen bg-[#050202] text-[#d62828] font-['Playfair_Display'] selection:bg-[#d62828] selection:text-black overflow-x-hidden relative">
      
      {/* Real Background Image */}
      <motion.div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})`, scale: bgScale }}
      />
      
      {/* Darkening & Grain overlay for readability and texture */}
      <div className="fixed inset-0 z-0 bg-black/60 pointer-events-none"></div>
      <div 
        className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      {/* FIXED HERO (Head) */}
      <div className="fixed inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.div
          style={{ scale: headScale, y: headY, rotate: headRotate, opacity: headOpacity }}
          className="relative w-64 md:w-80 flex items-center justify-center group"
        >
          {/* Glowing backdrop effect */}
          <div className="absolute inset-0 bg-[#d62828]/20 blur-3xl rounded-full scale-110 opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
          
          <motion.img 
            src={headImage} 
            alt="Margo Zendegi Artwork Centerpiece"
            className="w-full h-auto drop-shadow-[0_0_40px_rgba(214,40,40,0.4)] relative z-10"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* FIXED ICONS (With single Flex container for perfect even spacing) */}
      <motion.div 
        style={{ opacity: iconsOpacity }}
        className="fixed bottom-16 md:bottom-24 w-full flex justify-center gap-8 md:gap-12 z-20 pointer-events-none"
      >
        <motion.a href="#" aria-label="Spotify" style={{ x: icon1X, y: icon1Y, rotate: icon1Rotate, scale: iconScale }} className="pointer-events-auto p-2 text-[#d62828]/60 hover:text-white transition-colors duration-500 hover:drop-shadow-[0_0_15px_rgba(214,40,40,0.8)]">
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.661 12.9c.42.18.6.78.3 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
        </motion.a>
        <motion.a href="#" aria-label="Apple Music" style={{ x: icon2X, y: icon2Y, rotate: icon2Rotate, scale: iconScale }} className="pointer-events-auto p-2 text-[#d62828]/60 hover:text-white transition-colors duration-500 hover:drop-shadow-[0_0_15px_rgba(214,40,40,0.8)]">
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
        </motion.a>
        <motion.a href="#" aria-label="YouTube" style={{ x: icon3X, y: icon3Y, rotate: icon3Rotate, scale: iconScale }} className="pointer-events-auto p-2 text-[#d62828]/60 hover:text-white transition-colors duration-500 hover:drop-shadow-[0_0_15px_rgba(214,40,40,0.8)]">
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </motion.a>
        <motion.a href="#" aria-label="SoundCloud" style={{ x: icon4X, y: icon4Y, rotate: icon4Rotate, scale: iconScale }} className="pointer-events-auto p-2 text-[#d62828]/60 hover:text-white transition-colors duration-500 hover:drop-shadow-[0_0_15px_rgba(214,40,40,0.8)]">
          <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 97.75 97.75" fill="currentColor">
            <path d="M48.875,0C21.883,0,0,21.882,0,48.875S21.883,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.867,0,48.875,0z M7.739,62.171C7.712,62.364,7.573,62.5,7.399,62.5c-0.175,0-0.315-0.136-0.339-0.331l-0.621-4.633l0.621-4.713 c0.023-0.196,0.164-0.333,0.339-0.333c0.174,0,0.313,0.136,0.34,0.33l0.736,4.717L7.739,62.171z M10.893,64.991 c-0.03,0.2-0.176,0.342-0.354,0.342c-0.18,0-0.328-0.144-0.353-0.343l-0.834-7.454l0.834-7.622 c0.024-0.199,0.173-0.344,0.353-0.344c0.179,0,0.324,0.141,0.354,0.344l0.948,7.622L10.893,64.991z M14.298,66.252 c-0.026,0.241-0.205,0.415-0.426,0.415c-0.224,0-0.402-0.174-0.425-0.417l-0.792-8.712c0,0,0.792-9.043,0.792-9.044 c0.022-0.241,0.201-0.416,0.425-0.416c0.221,0,0.399,0.175,0.426,0.416l0.899,9.044L14.298,66.252z M17.732,66.529 c-0.024,0.277-0.238,0.488-0.497,0.488c-0.264,0-0.479-0.211-0.5-0.488l-0.748-8.989l0.748-9.292c0.021-0.28,0.236-0.49,0.5-0.49 c0.259,0,0.473,0.21,0.497,0.487l0.85,9.294L17.732,66.529z M21.193,66.604c-0.021,0.318-0.268,0.562-0.57,0.562 c-0.305,0-0.551-0.243-0.571-0.562l-0.706-9.063l0.706-8.619c0.021-0.321,0.267-0.563,0.571-0.563c0.303,0,0.549,0.242,0.57,0.56 l0.801,8.623L21.193,66.604z M24.682,66.607v-0.004c-0.021,0.355-0.302,0.636-0.643,0.636c-0.344,0-0.625-0.28-0.644-0.634 l-0.661-9.062l0.661-14.024c0.019-0.357,0.3-0.636,0.644-0.636c0.341,0,0.622,0.279,0.643,0.635l0.75,14.025L24.682,66.607z M28.145,66.6v-0.005c-0.018,0.398-0.333,0.708-0.716,0.708c-0.384,0-0.698-0.31-0.713-0.705l-0.622-9.007 c0,0,0.619-17.229,0.619-17.23c0.018-0.397,0.332-0.708,0.716-0.708c0.383,0,0.698,0.311,0.716,0.708l0.701,17.23L28.145,66.6z M31.74,66.462v-0.005c-0.018,0.438-0.362,0.779-0.786,0.779c-0.427,0-0.773-0.342-0.788-0.775l-0.577-8.914 c0,0,0.577-18.667,0.577-18.669c0.015-0.438,0.361-0.781,0.788-0.781c0.424,0,0.769,0.343,0.786,0.781l0.652,18.669L31.74,66.462z M35.311,66.402c-0.014,0.478-0.393,0.853-0.859,0.853c-0.47,0-0.846-0.375-0.858-0.849l-0.536-8.858l0.534-19.297 c0.015-0.479,0.391-0.855,0.86-0.855c0.467,0,0.846,0.375,0.859,0.855l0.603,19.298L35.311,66.402z M38.908,66.325v-0.007 c-0.014,0.519-0.423,0.929-0.932,0.929c-0.511,0-0.92-0.41-0.931-0.924l-0.493-8.773l0.49-18.805 c0.014-0.52,0.423-0.927,0.934-0.927c0.509,0,0.918,0.406,0.932,0.925l0.555,18.807L38.908,66.325z M42.534,66.27v-0.006 c-0.011,0.561-0.453,1-1.005,1c-0.551,0-0.994-0.439-1.005-0.994l-0.449-8.719l0.449-18.119c0.011-0.561,0.454-1,1.005-1 c0.552,0,0.994,0.44,1.005,1l0.503,18.121L42.534,66.27z M46.232,65.354l-0.045,0.854c-0.005,0.295-0.13,0.563-0.324,0.758 c-0.195,0.193-0.461,0.314-0.753,0.314c-0.329,0-0.625-0.152-0.824-0.39c-0.146-0.176-0.239-0.399-0.25-0.641 c-0.002-0.012-0.003-0.023-0.003-0.037c0,0-0.408-8.654-0.408-8.667l0.404-21.352l0.004-0.203c0.005-0.377,0.202-0.708,0.497-0.899 c0.167-0.11,0.365-0.175,0.58-0.175c0.218,0,0.424,0.068,0.595,0.184c0.285,0.193,0.476,0.519,0.482,0.889l0.452,21.562 L46.232,65.354z M49.825,66.092V66.09v-0.008c-0.013,0.631-0.525,1.146-1.15,1.146c-0.627,0-1.143-0.515-1.151-1.138l-0.232-4.209 l-0.238-4.325l0.469-23.397l0.002-0.118c0.004-0.356,0.17-0.674,0.427-0.885c0.197-0.164,0.45-0.262,0.725-0.262 c0.214,0,0.414,0.061,0.585,0.165c0.33,0.201,0.559,0.565,0.565,0.98l0.509,23.518L49.825,66.092z M80.872,67.25 c0,0-28.909,0.003-28.937,0c-0.625-0.062-1.121-0.559-1.127-1.198c0,0,0-33.131,0-33.132c0.006-0.609,0.215-0.922,1.004-1.227 c2.025-0.785,4.322-1.248,6.676-1.248c9.627,0,17.515,7.38,18.347,16.787c1.242-0.52,2.606-0.81,4.037-0.81 c5.767,0,10.438,4.674,10.438,10.439C91.311,62.626,86.639,67.25,80.872,67.25z"/>
          </svg>
        </motion.a>
      </motion.div>

      {/* SCROLLABLE TRACKLIST */}
      <div className="relative z-30 pt-[100vh] pb-32 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-8 md:space-y-12 px-6">
          {TRACKLIST.map((track, index) => (
            <motion.div 
              key={track.id}
              initial={{ opacity: 0, y: 60, rotateX: 60, scale: 0.8, transformPerspective: 1000 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1000 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center justify-center group cursor-default"
            >
              <h3 className="text-3xl md:text-5xl font-medium tracking-widest uppercase hover:text-white transition-all duration-700 opacity-90 hover:opacity-100 drop-shadow-2xl text-center">
                {track.title}
              </h3>
              {/* Subtle underline reveal effect */}
              <div className="w-0 h-[1px] bg-white mt-3 transition-all duration-700 group-hover:w-1/3 opacity-0 group-hover:opacity-100"></div>
            </motion.div>
          ))}
        </div>

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-40 text-center opacity-50 text-xs tracking-[0.2em] flex flex-col gap-2 uppercase drop-shadow-md"
        >
          <p>ATAFLAME | EMVDBRZ</p>
          <p>&copy; {new Date().getFullYear()} Sepehr Khalse. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
}

