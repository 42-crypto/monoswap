const SearchField = () => {
  return (
    <div className='searchField'>
      <div className="filter">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 30H26V28H22V30ZM15 18V20H33V18H15ZM18 25H30V23H18V25Z" fill="white"/>
        </svg>
      </div>
      <div className="searchBar">
        <svg width="600" height="60" viewBox="0 0 940 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.5 24.2549H39.71L39.43 23.9849C40.41 22.8449 41 21.3649 41 19.7549C41 16.1649 38.09 13.2549 34.5 13.2549C30.91 13.2549 28 16.1649 28 19.7549C28 23.3449 30.91 26.2549 34.5 26.2549C36.11 26.2549 37.59 25.6649 38.73 24.6849L39 24.9649V25.7549L44 30.7449L45.49 29.2549L40.5 24.2549ZM34.5 24.2549C32.01 24.2549 30 22.2449 30 19.7549C30 17.2649 32.01 15.2549 34.5 15.2549C36.99 15.2549 39 17.2649 39 19.7549C39 22.2449 36.99 24.2549 34.5 24.2549Z" fill="#8E849E"/>
          <path d="M60.2715 27.6875C62.8496 27.6875 64.4355 26.4219 64.4355 24.4219V24.4141C64.4355 22.6953 63.4668 21.7578 61.1543 21.25L59.9043 20.9766C58.4355 20.6562 57.7559 20.0781 57.7559 19.1562V19.1484C57.7559 18.0625 58.7402 17.3438 60.248 17.3359C61.6777 17.3359 62.6387 18.0156 62.8105 19.1641L62.8262 19.2734H64.2324L64.2246 19.1562C64.0996 17.3125 62.4902 16.0391 60.2871 16.0391C57.9668 16.0391 56.3262 17.3359 56.3184 19.1875V19.1953C56.3184 20.8438 57.3496 21.8359 59.5527 22.3203L60.8027 22.5938C62.3496 22.9375 62.998 23.4922 62.998 24.4844V24.4922C62.998 25.6562 61.9746 26.3906 60.3496 26.3906C58.7168 26.3906 57.623 25.6953 57.459 24.5625L57.4434 24.4531H56.0371L56.0449 24.5625C56.1855 26.4922 57.834 27.6875 60.2715 27.6875ZM69.2168 27.6562C70.9902 27.6562 72.3184 26.5938 72.584 25.25L72.5996 25.1719H71.2637L71.2402 25.2422C71.0059 25.9375 70.2793 26.4531 69.248 26.4531C67.8027 26.4531 66.8809 25.4766 66.8496 23.8047H72.7012V23.3047C72.7012 20.8672 71.3496 19.2188 69.1309 19.2188C66.9121 19.2188 65.4746 20.9453 65.4746 23.4609V23.4688C65.4746 26.0234 66.8809 27.6562 69.2168 27.6562ZM69.123 20.4219C70.3105 20.4219 71.1855 21.1641 71.3184 22.7422H66.873C67.0215 21.2266 67.9434 20.4219 69.123 20.4219ZM76.4512 27.6562C77.5371 27.6562 78.5137 27.0703 78.9902 26.1797H79.0215V27.5H80.3809V21.8828C80.3809 20.2578 79.1777 19.2188 77.2559 19.2188C75.3418 19.2188 74.1777 20.2969 74.0605 21.6328L74.0527 21.7188H75.3652L75.3809 21.6484C75.5371 20.9219 76.1934 20.4219 77.2402 20.4219C78.373 20.4219 79.0215 21.0234 79.0215 22.0156V22.6953L76.6934 22.8281C74.8262 22.9375 73.748 23.8047 73.748 25.1875V25.2031C73.748 26.6797 74.834 27.6562 76.4512 27.6562ZM75.1387 25.2031V25.1875C75.1387 24.4297 75.7637 23.9453 76.8496 23.8828L79.0215 23.75V24.4141C79.0215 25.5938 78.0371 26.4766 76.7559 26.4766C75.7793 26.4766 75.1387 25.9844 75.1387 25.2031ZM82.1074 27.5H83.4668V22.4844C83.4668 21.25 84.1543 20.5156 85.209 20.5156C85.5371 20.5156 85.8262 20.5547 85.9355 20.5938V19.2734C85.8262 19.2578 85.623 19.2188 85.3887 19.2188C84.4746 19.2188 83.7715 19.8125 83.498 20.75H83.4668V19.375H82.1074V27.5ZM90.0215 27.6562C91.8574 27.6562 93.1934 26.4609 93.4121 24.9141L93.4199 24.8594H92.084L92.0684 24.9219C91.8418 25.8281 91.1309 26.4531 90.0215 26.4531C88.6152 26.4531 87.6465 25.3359 87.6465 23.4453V23.4375C87.6465 21.5938 88.5918 20.4219 90.0059 20.4219C91.2012 20.4219 91.8574 21.1406 92.0605 21.9531L92.0762 22.0156H93.4043L93.3965 21.9531C93.2246 20.5625 92.0293 19.2188 90.0059 19.2188C87.748 19.2188 86.2559 20.8594 86.2559 23.4219V23.4297C86.2559 26.0156 87.7168 27.6562 90.0215 27.6562ZM94.7402 27.5H96.0996V22.7578C96.0996 21.375 96.9355 20.4219 98.1934 20.4219C99.459 20.4219 100.209 21.2891 100.209 22.7578V27.5H101.568V22.5234C101.568 20.5547 100.389 19.2188 98.6621 19.2188C97.4512 19.2188 96.5684 19.7578 96.1309 20.6719H96.0996V16.2266H94.7402V27.5Z" fill="#8E849E"/>
          <rect x="13" y="1.5" width="914" height="41" rx="11" stroke="#8E849E" stroke-width="2"/>
        </svg>
      </div>
      <div className="switchUser">
        <svg width="141" height="33" viewBox="0 0 141 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12C1 5.92487 5.92487 1 12 1H64V43H12C5.92487 43 1 38.0751 1 32V12Z" fill="#6C5F81"/>
          <path d="M22.0156 27.6953C25.1562 27.6953 27.0156 25.8359 27.0156 22.7656V21.4688H22.1406V23.2266H24.7188L24.7109 23.3906C24.6484 24.7812 23.5938 25.6953 22.0547 25.6953C20.1797 25.6953 18.9922 24.25 18.9922 21.8047V21.7969C18.9922 19.4062 20.1094 18.0312 21.9688 18.0312C23.2422 18.0312 24.1406 18.6641 24.5156 19.7578L24.5469 19.8359H26.9141L26.8906 19.7266C26.5156 17.6094 24.6719 16.0312 21.9609 16.0312C18.6562 16.0312 16.5859 18.2109 16.5859 21.8203V21.8281C16.5859 25.5 18.6484 27.6953 22.0156 27.6953ZM29.5703 18.0469C30.2578 18.0469 30.7891 17.5078 30.7891 16.8594C30.7891 16.2109 30.2578 15.6719 29.5703 15.6719C28.8828 15.6719 28.3516 16.2109 28.3516 16.8594C28.3516 17.5078 28.8828 18.0469 29.5703 18.0469ZM28.4297 27.5H30.7109V19.125H28.4297V27.5ZM34.4531 27.5H37.0234L39.8984 19.125H37.5156L35.7891 25.4844H35.7422L33.9922 19.125H31.5547L34.4531 27.5ZM44.2109 27.6719C46.6016 27.6719 47.7578 26.2578 48.0156 25.0234L48.0391 24.9375H45.9453L45.9297 24.9844C45.7656 25.4531 45.1953 25.9688 44.2578 25.9688C43.0938 25.9688 42.3672 25.1875 42.3438 23.8516H48.1094V23.1484C48.1094 20.6172 46.5703 18.9531 44.1172 18.9531C41.6641 18.9531 40.0938 20.6562 40.0938 23.3203V23.3281C40.0938 26.0078 41.6484 27.6719 44.2109 27.6719ZM44.1562 20.6562C45.1016 20.6562 45.7812 21.2578 45.9219 22.4141H42.3672C42.5156 21.2812 43.2188 20.6562 44.1562 20.6562Z" fill="white"/>
          <path d="M1 12C1 5.92487 5.92487 1 12 1H64V43H12C5.92487 43 1 38.0751 1 32V12Z" stroke="#8E849E" stroke-width="2"/>
          <path d="M82.6328 27.5H84.9922V18.1719H88.2578V16.2266H79.375V18.1719H82.6328V27.5ZM89.9375 27.6328C91.0391 27.6328 91.9297 27.1094 92.4062 26.25H92.4531V27.5H94.7344V21.7578C94.7344 20.0703 93.3359 18.9531 91.1719 18.9531C88.9609 18.9531 87.6328 20.0625 87.5078 21.6094L87.5 21.7031H89.5859L89.6016 21.6328C89.7109 21.0938 90.2266 20.6953 91.0781 20.6953C91.9688 20.6953 92.4531 21.1562 92.4531 21.8984V22.4141L90.3828 22.5391C88.3047 22.6719 87.125 23.5625 87.125 25.0859V25.1016C87.125 26.5781 88.2578 27.6328 89.9375 27.6328ZM89.3828 24.9844V24.9688C89.3828 24.375 89.8438 24 90.7266 23.9453L92.4531 23.8359V24.4375C92.4531 25.3125 91.7031 25.9688 90.6797 25.9688C89.8906 25.9688 89.3828 25.6016 89.3828 24.9844ZM96.2891 27.5H98.5703V24.7266L99.1562 24.0781L101.555 27.5H104.188L100.867 22.7266L104.031 19.125H101.445L98.6172 22.4766H98.5703V16.2266H96.2891V27.5ZM108.242 27.6719C110.633 27.6719 111.789 26.2578 112.047 25.0234L112.07 24.9375H109.977L109.961 24.9844C109.797 25.4531 109.227 25.9688 108.289 25.9688C107.125 25.9688 106.398 25.1875 106.375 23.8516H112.141V23.1484C112.141 20.6172 110.602 18.9531 108.148 18.9531C105.695 18.9531 104.125 20.6562 104.125 23.3203V23.3281C104.125 26.0078 105.68 27.6719 108.242 27.6719ZM108.188 20.6562C109.133 20.6562 109.812 21.2578 109.953 22.4141H106.398C106.547 21.2812 107.25 20.6562 108.188 20.6562Z" fill="white"/>
          <path d="M64 1H117C123.075 1 128 5.92487 128 12V32C128 38.0751 123.075 43 117 43H64V1Z" stroke="#8E849E" stroke-width="2"/>
        </svg>
      </div>
      <div className="showOnlySwappable">
        <svg width="177" height="24" viewBox="0 0 177 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35.7812 17.6875C38.3594 17.6875 39.9453 16.4219 39.9453 14.4219V14.4141C39.9453 12.6953 38.9766 11.7578 36.6641 11.25L35.4141 10.9766C33.9453 10.6562 33.2656 10.0781 33.2656 9.15625V9.14844C33.2656 8.0625 34.25 7.34375 35.7578 7.33594C37.1875 7.33594 38.1484 8.01562 38.3203 9.16406L38.3359 9.27344H39.7422L39.7344 9.15625C39.6094 7.3125 38 6.03906 35.7969 6.03906C33.4766 6.03906 31.8359 7.33594 31.8281 9.1875V9.19531C31.8281 10.8438 32.8594 11.8359 35.0625 12.3203L36.3125 12.5938C37.8594 12.9375 38.5078 13.4922 38.5078 14.4844V14.4922C38.5078 15.6562 37.4844 16.3906 35.8594 16.3906C34.2266 16.3906 33.1328 15.6953 32.9688 14.5625L32.9531 14.4531H31.5469L31.5547 14.5625C31.6953 16.4922 33.3438 17.6875 35.7812 17.6875ZM41.4531 17.5H42.8125V12.7578C42.8125 11.375 43.6484 10.4219 44.9062 10.4219C46.1719 10.4219 46.9219 11.2891 46.9219 12.7578V17.5H48.2812V12.5234C48.2812 10.5547 47.1016 9.21875 45.375 9.21875C44.1641 9.21875 43.2812 9.75781 42.8438 10.6719H42.8125V6.22656H41.4531V17.5ZM53.375 17.6562C55.6172 17.6562 57.1328 16.0312 57.1328 13.4375V13.4219C57.1328 10.8281 55.6094 9.21875 53.3672 9.21875C51.125 9.21875 49.6094 10.8359 49.6094 13.4219V13.4375C49.6094 16.0234 51.1172 17.6562 53.375 17.6562ZM53.3828 16.4531C51.9453 16.4531 51 15.3516 51 13.4375V13.4219C51 11.5234 51.9531 10.4219 53.3672 10.4219C54.8047 10.4219 55.7422 11.5156 55.7422 13.4219V13.4375C55.7422 15.3438 54.8125 16.4531 53.3828 16.4531ZM60.1172 17.5H61.5L63.3281 11.2109H63.3594L65.1953 17.5H66.5781L68.8438 9.375H67.5L65.875 15.9844H65.8438L64 9.375H62.6875L60.8516 15.9844H60.8203L59.1953 9.375H57.8438L60.1172 17.5ZM76.6094 17.6562C78.8516 17.6562 80.3672 16.0312 80.3672 13.4375V13.4219C80.3672 10.8281 78.8438 9.21875 76.6016 9.21875C74.3594 9.21875 72.8438 10.8359 72.8438 13.4219V13.4375C72.8438 16.0234 74.3516 17.6562 76.6094 17.6562ZM76.6172 16.4531C75.1797 16.4531 74.2344 15.3516 74.2344 13.4375V13.4219C74.2344 11.5234 75.1875 10.4219 76.6016 10.4219C78.0391 10.4219 78.9766 11.5156 78.9766 13.4219V13.4375C78.9766 15.3438 78.0469 16.4531 76.6172 16.4531ZM81.7422 17.5H83.1016V12.7188C83.1016 11.3359 83.9375 10.4219 85.2188 10.4219C86.4688 10.4219 87.0859 11.1484 87.0859 12.4688V17.5H88.4453V12.2266C88.4453 10.375 87.4141 9.21875 85.6328 9.21875C84.3984 9.21875 83.5703 9.77344 83.1328 10.5312H83.1016V9.375H81.7422V17.5ZM90.25 17.5H91.6094V6.22656H90.25V17.5ZM94.2266 20.2344C95.6953 20.2344 96.4062 19.5625 96.9844 18.0078L100.156 9.375H98.7266L96.4766 16.1406H96.4453L94.2031 9.375H92.75L95.7656 17.5078L95.6016 17.9688C95.2734 18.8906 94.7969 19.1094 93.9375 19.1094C93.7734 19.1094 93.6172 19.0859 93.5 19.0625V20.1719C93.6719 20.2031 93.9609 20.2344 94.2266 20.2344ZM107.391 17.6562C109.203 17.6562 110.547 16.6562 110.547 15.2344V15.2266C110.547 14.0703 109.953 13.4219 108.312 13.0234L107.023 12.7109C106.125 12.4922 105.758 12.1094 105.758 11.5547V11.5469C105.758 10.8281 106.367 10.3516 107.352 10.3516C108.359 10.3516 108.961 10.875 109.07 11.6641L109.078 11.7188H110.375L110.367 11.6172C110.266 10.2578 109.133 9.21875 107.352 9.21875C105.594 9.21875 104.367 10.2109 104.367 11.6094V11.6172C104.367 12.7891 105.109 13.5 106.641 13.8672L107.93 14.1797C108.852 14.4062 109.156 14.7344 109.156 15.3203V15.3281C109.156 16.0625 108.5 16.5234 107.398 16.5234C106.289 16.5234 105.688 16.0469 105.523 15.2344L105.508 15.1562H104.148L104.156 15.2266C104.32 16.6797 105.477 17.6562 107.391 17.6562ZM113.57 17.5H114.953L116.781 11.2109H116.812L118.648 17.5H120.031L122.297 9.375H120.953L119.328 15.9844H119.297L117.453 9.375H116.141L114.305 15.9844H114.273L112.648 9.375H111.297L113.57 17.5ZM125.633 17.6562C126.719 17.6562 127.695 17.0703 128.172 16.1797H128.203V17.5H129.562V11.8828C129.562 10.2578 128.359 9.21875 126.438 9.21875C124.523 9.21875 123.359 10.2969 123.242 11.6328L123.234 11.7188H124.547L124.562 11.6484C124.719 10.9219 125.375 10.4219 126.422 10.4219C127.555 10.4219 128.203 11.0234 128.203 12.0156V12.6953L125.875 12.8281C124.008 12.9375 122.93 13.8047 122.93 15.1875V15.2031C122.93 16.6797 124.016 17.6562 125.633 17.6562ZM124.32 15.2031V15.1875C124.32 14.4297 124.945 13.9453 126.031 13.8828L128.203 13.75V14.4141C128.203 15.5938 127.219 16.4766 125.938 16.4766C124.961 16.4766 124.32 15.9844 124.32 15.2031ZM131.289 20.2344H132.648V16.1406H132.68C133.188 17.0781 134.133 17.6562 135.281 17.6562C137.32 17.6562 138.711 16.0078 138.711 13.4453V13.4375C138.711 10.875 137.336 9.21875 135.258 9.21875C134.094 9.21875 133.188 9.80469 132.68 10.75H132.648V9.375H131.289V20.2344ZM134.992 16.4531C133.625 16.4531 132.641 15.2578 132.641 13.4453V13.4375C132.641 11.6172 133.617 10.4219 134.992 10.4219C136.43 10.4219 137.32 11.5703 137.32 13.4375V13.4453C137.32 15.2969 136.43 16.4531 134.992 16.4531ZM140.086 20.2344H141.445V16.1406H141.477C141.984 17.0781 142.93 17.6562 144.078 17.6562C146.117 17.6562 147.508 16.0078 147.508 13.4453V13.4375C147.508 10.875 146.133 9.21875 144.055 9.21875C142.891 9.21875 141.984 9.80469 141.477 10.75H141.445V9.375H140.086V20.2344ZM143.789 16.4531C142.422 16.4531 141.438 15.2578 141.438 13.4453V13.4375C141.438 11.6172 142.414 10.4219 143.789 10.4219C145.227 10.4219 146.117 11.5703 146.117 13.4375V13.4453C146.117 15.2969 145.227 16.4531 143.789 16.4531ZM151.258 17.6562C152.344 17.6562 153.32 17.0703 153.797 16.1797H153.828V17.5H155.188V11.8828C155.188 10.2578 153.984 9.21875 152.062 9.21875C150.148 9.21875 148.984 10.2969 148.867 11.6328L148.859 11.7188H150.172L150.188 11.6484C150.344 10.9219 151 10.4219 152.047 10.4219C153.18 10.4219 153.828 11.0234 153.828 12.0156V12.6953L151.5 12.8281C149.633 12.9375 148.555 13.8047 148.555 15.1875V15.2031C148.555 16.6797 149.641 17.6562 151.258 17.6562ZM149.945 15.2031V15.1875C149.945 14.4297 150.57 13.9453 151.656 13.8828L153.828 13.75V14.4141C153.828 15.5938 152.844 16.4766 151.562 16.4766C150.586 16.4766 149.945 15.9844 149.945 15.2031ZM160.953 17.6562C163.031 17.6562 164.406 16 164.406 13.4375V13.4297C164.406 10.8672 163.016 9.21875 160.977 9.21875C159.828 9.21875 158.883 9.79688 158.375 10.7344H158.344V6.22656H156.984V17.5H158.344V16.125H158.375C158.883 17.0703 159.789 17.6562 160.953 17.6562ZM160.688 16.4531C159.312 16.4531 158.336 15.2578 158.336 13.4375V13.4297C158.336 11.6172 159.32 10.4219 160.688 10.4219C162.125 10.4219 163.016 11.5781 163.016 13.4297V13.4375C163.016 15.3047 162.125 16.4531 160.688 16.4531ZM165.844 17.5H167.203V6.22656H165.844V17.5ZM172.383 17.6562C174.156 17.6562 175.484 16.5938 175.75 15.25L175.766 15.1719H174.43L174.406 15.2422C174.172 15.9375 173.445 16.4531 172.414 16.4531C170.969 16.4531 170.047 15.4766 170.016 13.8047H175.867V13.3047C175.867 10.8672 174.516 9.21875 172.297 9.21875C170.078 9.21875 168.641 10.9453 168.641 13.4609V13.4688C168.641 16.0234 170.047 17.6562 172.383 17.6562ZM172.289 10.4219C173.477 10.4219 174.352 11.1641 174.484 12.7422H170.039C170.188 11.2266 171.109 10.4219 172.289 10.4219Z" fill="white"/>
          <path d="M19.5525 3H5.14554C4.00327 3 3.0874 3.9 3.0874 5V19C3.0874 20.1 4.00327 21 5.14554 21H19.5525C20.6948 21 21.6107 20.1 21.6107 19V5C21.6107 3.9 20.6948 3 19.5525 3ZM10.2909 17L5.14554 12L6.59653 10.59L10.2909 14.17L18.1015 6.58L19.5525 8L10.2909 17Z" fill="#24D6DD"/>
        </svg>
      </div>
      <style jsx>
        {`
          .searchField {
            display: flex;
            max-width: 96vw;
            margin: 0 auto;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default SearchField;