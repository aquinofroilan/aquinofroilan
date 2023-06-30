'use client'
import React from 'react'

interface SVGModuleProps {
  className?: string,
}

export const Figma = ({className}: SVGModuleProps) => {
  return (
    <svg onClick={() => {window.open('https://www.figma.com/', '_blank')}} role='link' aria-label='Link to Figma' className={className} viewBox="0 0 3000 3000" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Logo of Figma</title>
      <desc>The Figma logo represents a cloud-based design and prototyping tool used by designers and teams to collaborate on interface design projects. It features a stylized letter &quot;F&quot; in a vibrant purple color, symbolizing creativity, innovation, and collaboration. The clean lines and rounded corners of the letterform convey a sense of modernity and user-friendliness. Clicking on this logo will redirect you to the official Figma website, where you can create, edit, and share design files in real-time, enabling seamless collaboration and iterative design processes.</desc>
      <desc/>
      <path className='fill-[#0ACF83]' d="M1083.333374,2750c230,0,416.666626-186.666748,416.666626-416.666748v-416.666626h-416.666626  c-230.000061,0-416.666687,186.666626-416.666687,416.666626S853.333313,2750,1083.333374,2750z" id="path0_fill"/>
      <path className='fill-[#A259FF]' d="M666.666687,1500c0-230,186.666626-416.666748,416.666687-416.666748H1500v833.333374  h-416.666626C853.333313,1916.666626,666.666687,1730,666.666687,1500z" id="path1_fill"/>
      <path className='fill-[#F24E1E]' d="M666.666687,666.666626C666.666687,436.666656,853.333313,250,1083.333374,250H1500  v833.333252h-416.666626C853.333313,1083.333252,666.666687,896.666626,666.666687,666.666626z" id="path1_fill_1_"/>
      <path className='fill-[#FF7262]' d="M1500,250h416.666626c230.000122,0,416.666626,186.666656,416.666626,416.666626  s-186.666504,416.666626-416.666626,416.666626H1500V250z" id="path2_fill"/>
      <path className='fill-[#1ABCFE]'d="M2333.333252,1500c0,230-186.666504,416.666626-416.666626,416.666626S1500,1730,1500,1500  s186.666626-416.666748,416.666626-416.666748S2333.333252,1270,2333.333252,1500z"/>
    </svg>
  )
}

export const ReactJS = ({className}: SVGModuleProps) => {
  return (
    <svg onClick={() => {window.open('https://react.dev/', '_blank')}} role='link' aria-label='Link to ReactJS' className={className} fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2' viewBox="0 0 128 128" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Logo of React.js</title>
      <desc>The React.js logo represents a popular JavaScript library for building user interfaces. It features the word &quot;React&quot; in a bold blue font with a stylized atom symbol replacing the letter &quot;e.&quot; The atom symbolizes the modular and component-based nature of React, reflecting its core principles of reusability and efficient UI development. Clicking on this logo will redirect you to the official React.js website, where you can learn about React&apos;s declarative syntax, virtual DOM, and powerful features for creating interactive and scalable web applications.</desc>
      <g transform="matrix(1.25305,0,0,1.25305,-16.3076,4.57191)">
        <circle cx="64" cy="47.5" r="9.3" className='fill-[#61DAFB]'/>
        <path fillRule='nonzero' d="M64,81.7C71.3,88.8 78.5,93 84.3,93C86.2,93 88,92.6 89.5,91.7C94.7,88.7 96.6,81.2 94.8,70.5C94.5,68.6 94.1,66.7 93.6,64.7C95.6,64.1 97.4,63.5 99.2,62.9C109.3,59 114.9,53.6 114.9,47.7C114.9,41.7 109.3,36.3 99.2,32.5C97.4,31.8 95.6,31.2 93.6,30.7C94.1,28.7 94.5,26.8 94.8,24.9C96.5,14 94.6,6.4 89.4,3.4C87.9,2.5 86.1,2.1 84.2,2.1C78.5,2.1 71.2,6.3 63.9,13.4C56.7,6.3 49.5,2.1 43.7,2.1C41.8,2.1 40,2.5 38.5,3.4C33.3,6.4 31.4,13.9 33.2,24.6C33.5,26.5 33.9,28.4 34.4,30.4C32.4,31 30.6,31.6 28.8,32.2C18.7,36.1 13.1,41.5 13.1,47.4C13.1,53.4 18.7,58.8 28.8,62.6C30.6,63.3 32.4,63.9 34.4,64.4C33.9,66.4 33.5,68.3 33.2,70.2C31.5,80.9 33.4,88.5 38.5,91.4C40,92.3 41.8,92.7 43.7,92.7C49.5,92.9 56.7,88.7 64,81.7ZM58.4,68.2C60.2,68.3 62.1,68.3 64,68.3C65.9,68.3 67.8,68.3 69.6,68.2C67.8,70.6 65.9,72.8 64,74.9C62.1,72.8 60.2,70.6 58.4,68.2ZM46,57.9C47,59.6 47.9,61.2 49,62.8C45.9,62.4 43,61.9 40.2,61.3C41.1,58.6 42.1,55.8 43.3,53C44.1,54.6 45,56.3 46,57.9ZM40.2,33.8C43,33.2 45.9,32.7 49,32.3C48,33.9 47,35.5 46,37.2C45,38.9 44.1,40.5 43.3,42.2C42,39.3 41,36.5 40.2,33.8ZM45.7,47.5C47,44.8 48.4,42.1 50,39.4C51.5,36.8 53.2,34.2 54.9,31.6C57.9,31.4 60.9,31.3 64,31.3C67.2,31.3 70.2,31.4 73.1,31.6C74.9,34.2 76.5,36.8 78,39.4C79.6,42.1 81,44.8 82.3,47.5C81,50.2 79.6,52.9 78,55.6C76.5,58.2 74.8,60.8 73.1,63.4C70.1,63.6 67.1,63.7 64,63.7C60.8,63.7 57.8,63.6 54.9,63.4C53.1,60.8 51.5,58.2 50,55.6C48.4,52.9 47,50.2 45.7,47.5ZM84.8,42.1L82.1,37.1C81.1,35.4 80.2,33.8 79.1,32.2C82.2,32.6 85.1,33.1 87.9,33.7C87,36.5 86,39.3 84.8,42.1ZM84.8,52.9C86,55.7 87,58.5 87.9,61.2C85.1,61.8 82.2,62.3 79.1,62.7C80.1,61.1 81.1,59.5 82.1,57.8C83,56.3 83.9,54.6 84.8,52.9ZM87.1,87.6C86.3,88.1 85.3,88.3 84.2,88.3C79.3,88.3 73.2,84.3 67.2,78.3C70.1,75.2 72.9,71.7 75.7,67.8C80.4,67.4 84.9,66.7 89.1,65.7C89.6,67.5 89.9,69.3 90.2,71.1C91.6,79.6 90.5,85.7 87.1,87.6ZM92.3,34.9C103.5,38.1 110.2,43 110.2,47.5C110.2,51.4 105.6,55.3 97.5,58.4C95.9,59 94.1,59.6 92.3,60.1C91,56 89.4,51.8 87.4,47.5C89.4,43.2 91.1,39 92.3,34.9ZM84.3,6.7C85.4,6.7 86.3,6.9 87.2,7.4C90.5,9.3 91.7,15.3 90.3,23.9C90,25.6 89.6,27.4 89.2,29.3C85,28.4 80.5,27.7 75.8,27.2C73.1,23.3 70.2,19.8 67.3,16.7C73.3,10.8 79.4,6.7 84.3,6.7ZM69.6,26.8C67.8,26.7 65.9,26.7 64,26.7C62.1,26.7 60.2,26.7 58.4,26.8C60.2,24.4 62.1,22.2 64,20.1C65.9,22.2 67.8,24.5 69.6,26.8ZM40.9,7.4C41.7,6.9 42.7,6.7 43.8,6.7C48.7,6.7 54.8,10.7 60.8,16.7C57.9,19.8 55.1,23.3 52.3,27.2C47.6,27.6 43.1,28.3 38.9,29.3C38.4,27.5 38.1,25.7 37.8,23.9C36.4,15.4 37.5,9.4 40.9,7.4ZM35.7,60.1C24.5,56.9 17.8,52 17.8,47.5C17.8,43.6 22.4,39.7 30.5,36.6C32.1,36 33.9,35.4 35.7,34.9C37,39 38.6,43.2 40.6,47.5C38.6,51.8 36.9,56.1 35.7,60.1ZM37.8,71.1C38.1,69.4 38.5,67.6 38.9,65.7C43.1,66.6 47.6,67.3 52.3,67.8C55,71.7 57.9,75.2 60.8,78.3C54.8,84.2 48.7,88.3 43.8,88.3C42.7,88.3 41.8,88.1 40.9,87.6C37.5,85.7 36.4,79.6 37.8,71.1Z" className='fill-[#61DAFB]'/>
      </g>
    </svg>
  )
}

export const NextJS = ({className}: SVGModuleProps) => {
  return (
    <svg onClick={() => {window.open('https://nextjs.org/', '_blank')}} role='link' aria-label='Link to NextJS' className={`${className} fill-none`} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
      <title>Logo of Next.js</title>
      <desc>The Next.js logo represents a popular React framework for building modern web applications. It features the word &quot;Next&quot; in a bold black font with a white arrow pointing towards the right. The arrow signifies progress and forward movement, indicating the framework&apos;s focus on enabling efficient and seamless development experiences. Clicking on this logo will redirect you to the official Next.js website, where you can explore its powerful features, documentation, and resources for building fast, scalable, and SEO-friendly web applications.</desc>
      <path clipRule="evenodd" d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 10.087 13.6902 12.3681 11.6975 13.7163L4.90687 4.20942C4.78053 4.03255 4.5544 3.95756 4.34741 4.02389C4.14042 4.09022 4 4.28268 4 4.50004V12H5V6.06027L10.8299 14.2221C9.82661 14.7201 8.696 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM10 10V4H11V10H10Z" className='fill-black' fillRule="evenodd"/>
    </svg>
  )
}

export const MySQL = ({className}: SVGModuleProps) => {
  return (
    <svg onClick={() => window.open('https://www.mysql.com/', '_blank')} role='link' aria-label='Link to MySQL' className={className} viewBox="0 0 180.6 95.3" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Logo of MySQL</title>
      <desc>The MySQL logo represents a popular open-source relational database management system. It features a lowercase letter &quot;M&quot; in a bold blue font, symbolizing the simplicity, speed, and scalability of MySQL. The stylized &quot;M&quot; is formed with rounded corners, creating a friendly and approachable impression. Clicking on this logo will redirect you to the official MySQL website, where you can discover its features, download the software, and access community resources for database management and development.</desc>
      <path className='fill-[#00678F]' d="M1.7,85.3h5.8v-23l9.1,20c1,2.4,2.5,3.3,5.4,3.3c2.9,0,4.2-0.9,5.3-3.3l9-20v23h5.8v-23c0-2.2-0.9-3.3-2.8-3.9  c-4.4-1.3-7.4-0.2-8.7,2.8L21.8,81l-8.6-19.8c-1.3-3-4.3-4.1-8.7-2.8C2.6,59,1.7,60,1.7,62.3L1.7,85.3L1.7,85.3z"/>
      <path className='fill-[#00678F]' d="M46.9,66.6h5.8v12.6c0,0.7,0.2,2.3,3.4,2.4c1.7,0,12.6,0,12.7,0V66.5h5.8c0,0,0,20.6,0,20.7  c0,5.1-6.3,6.2-9.2,6.2H47.1v-3.9c0,0,18.4,0,18.4,0c3.7-0.4,3.3-2.3,3.3-2.9v-1.5H56.4c-5.8,0-9.5-2.6-9.5-5.5  C46.9,79.3,47.1,66.7,46.9,66.6L46.9,66.6z"/>
      <path className='fill-[#00678F]' d="M172.3,51.9c-3.6-0.1-6.3,0.3-8.7,1.2c-0.7,0.3-1.7,0.3-1.8,1.1c0.4,0.4,0.4,0.9,0.7,1.4  c0.5,0.9,1.5,2.1,2.3,2.7c0.9,0.7,1.9,1.4,2.9,2.1c1.7,1.1,3.7,1.7,5.4,2.8c1,0.6,2,1.4,2.9,2.1c0.5,0.4,0.8,0.9,1.4,1.2  c0,0,0-0.1,0-0.1c-0.3-0.4-0.4-1-0.7-1.4c-0.4-0.4-0.9-0.8-1.3-1.3c-1.3-1.7-2.9-3.3-4.6-4.5c-1.4-1-4.6-2.3-5.1-4c0,0,0,0-0.1-0.1  c1-0.1,2.1-0.4,3.1-0.7c1.5-0.4,2.9-0.3,4.5-0.7c0.7-0.2,1.4-0.4,2.1-0.6c0-0.1,0-0.3,0-0.4c-0.8-0.8-1.4-1.9-2.2-2.6  c-2.3-2-4.8-3.9-7.4-5.5c-1.4-0.9-3.2-1.5-4.6-2.2c-0.5-0.3-1.4-0.4-1.7-0.8c-0.8-1-1.3-2.3-1.8-3.4c-1.3-2.5-2.5-5.2-3.7-7.8  c-0.8-1.7-1.3-3.5-2.3-5.1c-4.6-7.6-9.6-12.2-17.3-16.7c-1.7-0.9-3.6-1.3-5.7-1.8c-1.1,0-2.2-0.1-3.3-0.2c-0.7-0.3-1.4-1.2-2.1-1.6  c-2.5-1.6-9.1-5.1-11-0.5c-1.2,2.9,1.8,5.8,2.8,7.2c0.8,1,1.7,2.2,2.3,3.3c0.3,0.8,0.4,1.6,0.7,2.4c0.7,2,1.4,4.1,2.3,6  c0.5,0.9,1,1.9,1.7,2.8c0.4,0.5,1,0.7,1.1,1.5c-0.6,0.9-0.7,2.2-1,3.3c-1.6,5-1,11.3,1.3,15c0.7,1.1,2.4,3.6,4.7,2.6  c2-0.8,1.6-3.3,2.1-5.6c0.1-0.5,0-0.9,0.3-1.2c0,0,0,0.1,0,0.1c0.6,1.2,1.2,2.5,1.8,3.7c1.4,2.2,3.8,4.5,5.8,6  c1.1,0.8,1.9,2.2,3.3,2.7c0,0,0-0.1,0-0.1c0,0,0,0-0.1,0c-0.3-0.4-0.7-0.6-1-0.9c-0.8-0.8-1.7-1.8-2.3-2.7c-1.9-2.5-3.5-5.3-5-8.1  c-0.7-1.4-1.3-2.9-1.9-4.3c-0.3-0.5-0.3-1.3-0.7-1.6c-0.7,1-1.7,1.8-2.1,3c-0.8,1.9-0.9,4.3-1.2,6.7c-0.2,0-0.1,0-0.2,0.1  c-1.4-0.4-1.9-1.8-2.5-3.1c-1.3-3.2-1.6-8.3-0.4-11.9c0.3-0.9,1.7-3.9,1.1-4.8c-0.3-0.8-1.2-1.3-1.7-2c-0.6-0.8-1.2-1.9-1.6-2.9  c-1.1-2.5-1.6-5.3-2.8-7.8c-0.5-1.2-1.5-2.4-2.2-3.4c-0.8-1.2-1.8-2.1-2.5-3.5c-0.2-0.5-0.5-1.3-0.2-1.8c0.1-0.4,0.3-0.5,0.6-0.6  c0.6-0.5,2.2,0.1,2.8,0.4c1.7,0.7,3,1.3,4.4,2.2c0.6,0.4,1.3,1.3,2.1,1.5c0.3,0,0.6,0,0.9,0c1.4,0.3,3,0.1,4.4,0.5  c2.4,0.8,4.5,1.9,6.4,3.1c5.8,3.7,10.7,9,13.9,15.3c0.5,1,0.8,2,1.2,3c0.9,2.2,2.1,4.4,3,6.6c0.9,2.1,1.8,4.2,3.2,6  c0.7,0.9,3.3,1.4,4.6,1.9c0.9,0.4,2.3,0.8,3.1,1.2c1.5,0.9,3,2,4.5,3C169.9,49.9,172.2,51,172.3,51.9L172.3,51.9z"/>
      <path className='fill-[#00678F]' d="M126.8,13.2c-0.8,0-1.3,0.1-1.8,0.2c0,0,0,0,0,0.1c0,0,0,0,0.1,0c0.4,0.7,1,1.2,1.4,1.8c0.4,0.7,0.7,1.4,1,2.1  c0,0,0.1-0.1,0.1-0.1c0.6-0.4,0.9-1.2,0.9-2.2c-0.3-0.3-0.3-0.6-0.5-0.9C127.7,13.7,127.1,13.5,126.8,13.2L126.8,13.2z"/>
      <path className='fill-[#E38D1A]' d="M79.1,85.3h16.8c2,0,3.8-0.4,5.4-1.1c2.5-1.2,3.7-2.7,3.7-4.8v-4.3c0-1.7-1.4-3.2-4.1-4.3  c-1.4-0.5-3.2-0.8-5-0.8h-7c-2.4,0-3.5-0.7-3.8-2.3c0-0.2,0-0.4,0-0.5v-2.6c0-0.1,0-0.3,0-0.5c0.3-1.2,0.9-1.5,3-1.7  c0.2,0,0.4,0,0.5,0h16.6v-3.9H88.9c-2.4,0-3.6,0.1-4.7,0.5c-3.4,1.1-5,2.8-5,5.8V68c0,2.6,2.9,4.9,7.9,5.4c0.5,0,1.1,0,1.7,0h6  c0.2,0,0.4,0,0.6,0c1.8,0.2,2.6,0.5,3.2,1.2c0.4,0.4,0.4,0.7,0.4,1.1v3.4c0,0.4-0.3,0.9-0.8,1.4s-1.4,0.8-2.5,0.8  c-0.2,0-0.4,0-0.6,0H79.1L79.1,85.3L79.1,85.3z"/>
      <path className='fill-[#E38D1A]' d="M141.3,78.5c0,4,3,6.2,9,6.6c0.6,0,1.1,0.1,1.7,0.1h15.2v-3.9h-15.3c-3.4,0-4.7-0.8-4.7-2.9V58.4h-5.8  L141.3,78.5L141.3,78.5z"/>
      <path className='fill-[#E38D1A]' d="M108.7,78.7V64.9c0-3.5,2.5-5.7,7.4-6.3c0.5,0,1.1-0.1,1.6-0.1h11.1c0.6,0,1.1,0,1.7,0.1  c4.9,0.7,7.3,2.8,7.3,6.3v13.8c0,2.9-1,4.4-3.4,5.4l5.7,5.2h-6.7l-4.6-4.2l-4.7,0.3h-6.2c-1,0-2.2-0.1-3.4-0.4  C110.5,83.9,108.7,81.9,108.7,78.7L108.7,78.7z M115,78.4c0,0.2,0.1,0.4,0.1,0.6c0.3,1.6,1.8,2.5,4.1,2.5h5.3l-4.8-4.4h6.7l4.2,3.8  c0.8-0.4,1.3-1.1,1.5-1.9c0-0.2,0-0.4,0-0.6V65.2c0-0.2,0-0.4,0-0.5c-0.3-1.5-1.8-2.4-4.1-2.4h-8.8c-2.6,0-4.3,1.1-4.3,2.9L115,78.4  L115,78.4z"/>
      <path className='fill-[#E38D1A]' d="M169.8,85.3h0.8V82h1.1v-0.7h-3.1V82h1.2L169.8,85.3L169.8,85.3z M176.3,85.3h0.8v-3.9h-1.2l-1,2.7l-1.1-2.7  h-1.2v3.9h0.8v-3h0l1.1,3h0.6l1.1-3l0,0L176.3,85.3L176.3,85.3z"/>
    </svg>
  )
}

export const Postgresql = ({className}: SVGModuleProps) => {
  return (
    <svg onClick={() => window.open('https://www.postgresql.org/', '_blank')} role='link' aria-label='Link to Postgresql' className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.6 25.6">
      <title>Logo of PostgreSQL</title>
      <desc>The PostgreSQL logo represents an open-source relational database management system. It features a stylized blue elephant with its trunk raised, symbolizing strength, reliability, and intelligence. The logo showcases the iconic PostgreSQL elephant&apos;s head, which has become synonymous with the database software. Clicking on this logo will redirect you to the official PostgreSQL website, where you can explore its features, documentation, and community support.</desc>
      <g className='fill-none stroke-white'>
        <path d="M18.983 18.636c.163-1.357.114-1.555 1.124-1.336l.257.023c.777.035 1.793-.125 2.4-.402 1.285-.596 2.047-1.592.78-1.33-2.89.596-3.1-.383-3.1-.383 3.053-4.53 4.33-10.28 3.227-11.687-3.004-3.84-8.205-2.024-8.292-1.976l-.028.005c-.57-.12-1.2-.19-1.93-.2-1.308-.02-2.3.343-3.054.914 0 0-9.277-3.822-8.846 4.807.092 1.836 2.63 13.9 5.66 10.25C8.29 15.987 9.36 14.86 9.36 14.86c.53.353 1.167.533 1.834.468l.052-.044a2.01 2.01 0 0 0 .021.518c-.78.872-.55 1.025-2.11 1.346-1.578.325-.65.904-.046 1.056.734.184 2.432.444 3.58-1.162l-.046.183c.306.245.285 1.76.33 2.842s.116 2.093.337 2.688.48 2.13 2.53 1.7c1.713-.367 3.023-.896 3.143-5.81" className='fill-black stroke-black' strokeLinecap="butt" strokeWidth="2.149" strokeLinejoin='miter'/>
        <path d="M23.535 15.6c-2.89.596-3.1-.383-3.1-.383 3.053-4.53 4.33-10.28 3.228-11.687-3.004-3.84-8.205-2.023-8.292-1.976l-.028.005a10.31 10.31 0 0 0-1.929-.201c-1.308-.02-2.3.343-3.054.914 0 0-9.278-3.822-8.846 4.807.092 1.836 2.63 13.9 5.66 10.25C8.29 15.987 9.36 14.86 9.36 14.86c.53.353 1.167.533 1.834.468l.052-.044a2.02 2.02 0 0 0 .021.518c-.78.872-.55 1.025-2.11 1.346-1.578.325-.65.904-.046 1.056.734.184 2.432.444 3.58-1.162l-.046.183c.306.245.52 1.593.484 2.815s-.06 2.06.18 2.716.48 2.13 2.53 1.7c1.713-.367 2.6-1.32 2.725-2.906.088-1.128.286-.962.3-1.97l.16-.478c.183-1.53.03-2.023 1.085-1.793l.257.023c.777.035 1.794-.125 2.39-.402 1.285-.596 2.047-1.592.78-1.33z" fill="#336791" stroke="none"/>
        <g strokeWidth='.716'>
          <g strokeLinecap='round'>
            <path d="M12.814 16.467c-.08 2.846.02 5.712.298 6.4s.875 2.05 2.926 1.612c1.713-.367 2.337-1.078 2.607-2.647l.633-5.017M10.356 2.2S1.072-1.596 1.504 7.033c.092 1.836 2.63 13.9 5.66 10.25C8.27 15.95 9.27 14.907 9.27 14.907m6.1-13.4c-.32.1 5.164-2.005 8.282 1.978 1.1 1.407-.175 7.157-3.228 11.687" strokeLinejoin='round'/>
            <path d="M20.425 15.17s.2.98 3.1.382c1.267-.262.504.734-.78 1.33-1.054.49-3.418.615-3.457-.06-.1-1.745 1.244-1.215 1.147-1.652-.088-.394-.69-.78-1.086-1.744-.347-.84-4.76-7.29 1.224-6.333.22-.045-1.56-5.7-7.16-5.782S7.99 8.196 7.99 8.196" strokeLinejoin="bevel"/>
          </g>
          <g strokeLinejoin='round'>
            <path d="M11.247 15.768c-.78.872-.55 1.025-2.11 1.346-1.578.325-.65.904-.046 1.056.734.184 2.432.444 3.58-1.163.35-.49-.002-1.27-.482-1.468-.232-.096-.542-.216-.94.23z"/>
            <path d="M11.196 15.753c-.08-.513.168-1.122.433-1.836.398-1.07 1.316-2.14.582-5.537-.547-2.53-4.22-.527-4.22-.184s.166 1.74-.06 3.365c-.297 2.122 1.35 3.916 3.246 3.733" strokeLinecap='round'/>
          </g>
        </g>
        <g className='fill-white' strokeLinejoin='miter'>
          <path d="M10.322 8.145c-.017.117.215.43.516.472s.558-.202.575-.32-.215-.246-.516-.288-.56.02-.575.136z" strokeWidth=".239"/>
          <path d="M19.486 7.906c.016.117-.215.43-.516.472s-.56-.202-.575-.32.215-.246.516-.288.56.02.575.136z" strokeWidth=".119"/>
        </g>
        <path d="M20.562 7.095c.05.92-.198 1.545-.23 2.524-.046 1.422.678 3.05-.413 4.68" strokeLinecap='round' strokeLinejoin='round' strokeWidth='.716'/>
      </g>
    </svg>
  )
}

export const Firebase = ({ className }: SVGModuleProps) => {
  return (
    <svg onClick={() => window.open('https://firebase.google.com/', '_blank')} role='link' aria-label='Link to Firebase' className={className} baseProfile="tiny" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Logo of Firebase</title>
      <desc>A logo representing Firebase, a mobile and web application development platform developed by Firebase, Inc. The logo features vibrant colors and a unique design, combining elements that symbolize innovation and technological advancement. Clicking on this logo will redirect you to the Firebase homepage, where you can explore its powerful tools and services for seamless app development and user engagement.</desc>
      <g>
        <path d="M297.036,205.578l-36.334,33.809l-33.716-68.005l17.446-39.108c4.416-7.84,11.621-7.855,16.037,0   L297.036,205.578z" className='fill-[#FFA000]'/>
        <polygon className='fill-[#F57F17]' points="260.702,239.386 124.924,365.697 226.986,171.381  "/>
        <path d="M336.776,153.901c6.491-6.239,13.202-4.111,14.912,4.729l35.342,205.375L269.873,434.22   c-4.1,2.264-14.957,3.246-14.957,3.246s-9.91-1.185-13.687-3.281L124.92,365.69L336.776,153.901z" className='fill-[#FFCA28]'/>
        <path d="M226.986,171.381L124.924,365.697l45.46-283.998c1.674-8.847,6.71-9.699,11.203-1.89L226.986,171.381z" className='fill-[#FFA000]'/>
      </g>
    </svg>
  )
}

export const Supabase = ({ className }: SVGModuleProps) => {
  return (
    <svg onClick={() => window.open('https://supabase.com/', '_blank')} role='link' aria-label='Link to Supbase' className={className} viewBox="0 0 256 263" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
      <title>Logo of Supabase</title>
      <desc>The Supabase logo represents an open-source platform for building scalable and secure applications with a PostgreSQL database. It features a stylized letter &quot;S&quot; in a vibrant blue color, symbolizing strength, reliability, and versatility. The &quot;S&quot; is designed with clean lines and geometric shapes, reflecting a modern and professional aesthetic. Clicking on this logo will redirect you to the official Supabase website, where you can leverage its powerful tools and APIs to develop and deploy your applications with ease, while benefiting from the robustness of PostgreSQL.</desc>
      <defs>
        <linearGradient x1="20.8617445%" y1="20.6868812%" x2="63.4256086%" y2="44.0710077%" id="supabase-linearGradient-1">
          <stop stopColor="#249361" offset="0%"></stop>
          <stop stopColor="#3ECF8E" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="1.99116498%" y1="-13.1584008%" x2="21.4025077%" y2="34.708062%" id="supabase-linearGradient-2">
          <stop stopColor="#000000" offset="0%"></stop>
          <stop stopColor="#000000" stopOpacity="0" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g>
        <path d="M149.601512,258.578826 C142.884085,267.038157 129.263882,262.403261 129.102024,251.601817 L126.735244,93.6176533 L232.963622,93.6176533 C252.204429,93.6176533 262.935398,115.840956 250.971119,130.909887 L149.601512,258.578826 Z" fill="url(#supabase-linearGradient-1)"></path>
        <path d="M149.601512,258.578826 C142.884085,267.038157 129.263882,262.403261 129.102024,251.601817 L126.735244,93.6176533 L232.963622,93.6176533 C252.204429,93.6176533 262.935398,115.840956 250.971119,130.909887 L149.601512,258.578826 Z" fillOpacity="0.2" fill="url(#supabase-linearGradient-2)"></path>
        <path d="M106.399023,4.36908575 C113.11645,-4.09118439 126.736889,0.544432392 126.898746,11.3460249 L127.935901,169.329953 L23.0369844,169.329953 C3.79559007,169.329953 -6.93568494,147.106651 5.02918175,132.037719 L106.399023,4.36908575 Z" className='fill-[#3ECF8E]'></path>
      </g>
    </svg>
  )
}

export const Github = ({ className }: SVGModuleProps) => {
  return (
    <svg role='link' aria-label='Link to Github' className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Logo of GitHub</title>
    <desc>The GitHub logo represents a widely-used web-based platform for version control and collaboration on software development projects. It features a black cat-like mascot named &quot;Octocat,&quot; with an octagonal body and a friendly expression. The Octocat is an iconic symbol of GitHub, embodying playfulness and community. Clicking on this logo will redirect you to my official GitHub account, where you can browse and see my code and repositories and see how my code works under the hood.</desc>
    <g>
      <path fillRule="evenodd" clipRule="evenodd" fill="#000000" d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7C480,134.8,379.7,32,256,32z"/>
    </g>
    </svg>
  )
}

export const TailWindCSS = ({ className }: SVGModuleProps) => {
  return (
    <svg onClick={() => window.open('https://tailwindcss.com/', '_blank')} role='link' aria-label='Link to Tailwind CSS' className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 73.29">
      <title>Logo of Tailwind CSS</title>
      <desc>The Tailwind CSS logo represents a highly customizable, utility-first CSS framework for building modern web interfaces. It features the word &quot;Tailwind&quot; in a bold blue font with a stylized wing-like element extending from the letter &quot;d.&quot; The wing signifies the framework&apos;s ability to empower developers to rapidly build and customize user interfaces. Clicking on this logo will redirect you to the official Tailwind CSS website, where you can explore its extensive utility classes, responsive design system, and intuitive development workflow to streamline your CSS development process.</desc>
      <path className='fill-[#06B6D4]' d="M61.44,0Q36.87,0,30.72,24.43q9.22-12.21,21.5-9.16c4.68,1.16,8,4.53,11.72,8.26,6,6.08,13,13.11,28.22,13.11q24.57,0,30.72-24.43-9.21,12.22-21.5,9.16c-4.68-1.16-8-4.53-11.72-8.26C83.64,7,76.67,0,61.44,0ZM30.72,36.64Q6.15,36.64,0,61.07q9.23-12.21,21.5-9.16c4.68,1.16,8,4.53,11.72,8.27,6,6.07,13,13.11,28.22,13.11q24.57,0,30.72-24.43Q82.95,61.07,70.66,58c-4.68-1.16-8-4.53-11.72-8.26-6-6.08-13-13.12-28.22-13.12Z"/>
    </svg>
  )
}


export const Instagram = ({ className }: SVGModuleProps) => {
  return (
    <svg role='link' aria-label='Link to Instagram' className={className} fillRule='evenodd' clipRule='evenodd'strokeLinejoin='round' strokeMiterlimit='2' viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Logo of Instagram</title>
      <desc>Instagram is a popular social media platform focused on sharing photos and videos. Launched in 2010, Instagram has become a thriving community where users can capture and edit visually stunning moments, apply creative filters and effects, and share them with their followers. It provides a platform for me to showcase captivating images, engaging videos, and share my creative journey with you. By clicking on the Instagram logo, you can visit my Instagram account and contact me if you have inquiries and project you want me to do.</desc>
      <path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm0,96c-43.453,0 -48.902,0.184 -65.968,0.963c-17.03,0.777 -28.661,3.482 -38.839,7.437c-10.521,4.089 -19.444,9.56 -28.339,18.455c-8.895,8.895 -14.366,17.818 -18.455,28.339c-3.955,10.177 -6.659,21.808 -7.437,38.838c-0.778,17.066 -0.962,22.515 -0.962,65.968c0,43.453 0.184,48.902 0.962,65.968c0.778,17.03 3.482,28.661 7.437,38.838c4.089,10.521 9.56,19.444 18.455,28.34c8.895,8.895 17.818,14.366 28.339,18.455c10.178,3.954 21.809,6.659 38.839,7.436c17.066,0.779 22.515,0.963 65.968,0.963c43.453,0 48.902,-0.184 65.968,-0.963c17.03,-0.777 28.661,-3.482 38.838,-7.436c10.521,-4.089 19.444,-9.56 28.34,-18.455c8.895,-8.896 14.366,-17.819 18.455,-28.34c3.954,-10.177 6.659,-21.808 7.436,-38.838c0.779,-17.066 0.963,-22.515 0.963,-65.968c0,-43.453 -0.184,-48.902 -0.963,-65.968c-0.777,-17.03 -3.482,-28.661 -7.436,-38.838c-4.089,-10.521 -9.56,-19.444 -18.455,-28.339c-8.896,-8.895 -17.819,-14.366 -28.34,-18.455c-10.177,-3.955 -21.808,-6.66 -38.838,-7.437c-17.066,-0.779 -22.515,-0.963 -65.968,-0.963Zm0,28.829c42.722,0 47.782,0.163 64.654,0.933c15.6,0.712 24.071,3.318 29.709,5.509c7.469,2.902 12.799,6.37 18.397,11.969c5.6,5.598 9.067,10.929 11.969,18.397c2.191,5.638 4.798,14.109 5.509,29.709c0.77,16.872 0.933,21.932 0.933,64.654c0,42.722 -0.163,47.782 -0.933,64.654c-0.711,15.6 -3.318,24.071 -5.509,29.709c-2.902,7.469 -6.369,12.799 -11.969,18.397c-5.598,5.6 -10.928,9.067 -18.397,11.969c-5.638,2.191 -14.109,4.798 -29.709,5.509c-16.869,0.77 -21.929,0.933 -64.654,0.933c-42.725,0 -47.784,-0.163 -64.654,-0.933c-15.6,-0.711 -24.071,-3.318 -29.709,-5.509c-7.469,-2.902 -12.799,-6.369 -18.398,-11.969c-5.599,-5.598 -9.066,-10.928 -11.968,-18.397c-2.191,-5.638 -4.798,-14.109 -5.51,-29.709c-0.77,-16.872 -0.932,-21.932 -0.932,-64.654c0,-42.722 0.162,-47.782 0.932,-64.654c0.712,-15.6 3.319,-24.071 5.51,-29.709c2.902,-7.468 6.369,-12.799 11.968,-18.397c5.599,-5.599 10.929,-9.067 18.398,-11.969c5.638,-2.191 14.109,-4.797 29.709,-5.509c16.872,-0.77 21.932,-0.933 64.654,-0.933Zm0,49.009c-45.377,0 -82.162,36.785 -82.162,82.162c0,45.377 36.785,82.162 82.162,82.162c45.377,0 82.162,-36.785 82.162,-82.162c0,-45.377 -36.785,-82.162 -82.162,-82.162Zm0,135.495c-29.455,0 -53.333,-23.878 -53.333,-53.333c0,-29.455 23.878,-53.333 53.333,-53.333c29.455,0 53.333,23.878 53.333,53.333c0,29.455 -23.878,53.333 -53.333,53.333Zm104.609,-138.741c0,10.604 -8.597,19.199 -19.201,19.199c-10.603,0 -19.199,-8.595 -19.199,-19.199c0,-10.604 8.596,-19.2 19.199,-19.2c10.604,0 19.201,8.596 19.201,19.2Z"/>
    </svg>
  )
}

export const Phone = ({className}: SVGModuleProps) => {
  return (
    <svg onClick={() => window.location.href = 'tel:+639060162213'} role='Phone call' aria-label='Button to call me' className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <title>Phone Call</title>
      <desc>The phone call icon represents a button to call me. Clicking on this icon will redirect you to your phone app and call me.</desc>
      <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/>
    </svg>
  )
}

export const LinkedIn = ({className}: SVGModuleProps) => {
  return (
    <svg onClick={() => window.open('https://www.linkedin.com/in/froilan-aquino-8249a9192/', '_blank')} role='link' aria-label='Link to LinkedIn' className={className} height="100%" fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2' viewBox="0 0 512 512" width="100%" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Logo of LinkedIn</title>
      <desc>The LinkedIn logo represents a professional networking platform for connecting professionals, businesses, and job seekers. It features the word &quot;LinkedIn&quot; in a distinct blue font with the letter &quot;in&quot; enclosed in a square. The square symbolizes community, integrity, and reliability. Clicking on this logo will redirect you to mu LinkedIn profile where you can connect and send me a message whenever you have a project.</desc>
      <path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm-80.037,399.871l0,-199.921l-66.464,0l0,199.921l66.464,0Zm239.62,0l0,-114.646c0,-61.409 -32.787,-89.976 -76.509,-89.976c-35.255,0 -51.047,19.389 -59.889,33.007l0,-28.306l-66.447,0c0.881,18.757 0,199.921 0,199.921l66.446,0l0,-111.65c0,-5.976 0.43,-11.95 2.191,-16.221c4.795,-11.935 15.737,-24.299 34.095,-24.299c24.034,0 33.663,18.34 33.663,45.204l0,106.966l66.45,0Zm-272.403,-296.321c-22.74,0 -37.597,14.95 -37.597,34.545c0,19.182 14.405,34.544 36.717,34.544l0.429,0c23.175,0 37.6,-15.362 37.6,-34.544c-0.43,-19.595 -14.424,-34.545 -37.149,-34.545Z"/>
    </svg>
  )
}

export const Discord = ({className}: SVGModuleProps) => {
  return (
    <svg onClick={() => window.open('https://discord.com/login?redirect_to=%2Flogin%3Fredirect_to%3D%252Fchannels%252F834027432150564875%252F834027432587690005', '_blank')} role='link' aria-label='Link to my Discord' className={className} enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Logo of Discord</title>
      <desc>The Discord logo represents a popular communication platform for gamers and communities. It features a distinctive white silhouette of a game controller on a vibrant purple background. The game controller represents the platform&apos;s focus on providing a seamless and immersive voice, video, and text communication experience for gamers and communities worldwide. Clicking on this logo will redirect you to my Discord Server where you can communicate with me.</desc>
      <circle cx="256" cy="256" className='fill-black' r="256"/>
      <path d="M372.4,168.7c0,0-33.3-26.1-72.7-29.1l-3.5,7.1c35.6,8.7,51.9,21.2,69,36.5  c-29.4-15-58.5-29.1-109.1-29.1s-79.7,14.1-109.1,29.1c17.1-15.3,36.5-29.2,69-36.5l-3.5-7.1c-41.3,3.9-72.7,29.1-72.7,29.1  s-37.2,54-43.6,160c37.5,43.3,94.5,43.6,94.5,43.6l11.9-15.9c-20.2-7-43.1-19.6-62.8-42.3c23.5,17.8,59.1,36.4,116.4,36.4  s92.8-18.5,116.4-36.4c-19.7,22.7-42.6,35.3-62.8,42.3l11.9,15.9c0,0,57-0.3,94.5-43.6C409.6,222.7,372.4,168.7,372.4,168.7z   M208.7,299.6c-14.1,0-25.5-13-25.5-29.1s11.4-29.1,25.5-29.1c14.1,0,25.5,13,25.5,29.1S222.8,299.6,208.7,299.6z M303.3,299.6  c-14.1,0-25.5-13-25.5-29.1s11.4-29.1,25.5-29.1s25.5,13,25.5,29.1S317.3,299.6,303.3,299.6z" className='fill-white'/>
    </svg>
  )
}

