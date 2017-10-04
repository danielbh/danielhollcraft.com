/**
 * Created by danielhollcraft on 6/27/17.
 */

import DanielHollcraftDesktop from './project-images/daniel-hollcraft-desktop.png'
import DanielHollcraftMobile from './project-images/daniel-hollcraft-mobile.png'
import GrassMonitorMobile from './project-images/grass-monitor-mobile.png'
import LalParisMobile from './project-images/lal-paris-mobile.png'

export default [
  {
    title: 'A Static Website Blog',
    start: 'Apr 2017',
    end: 'Present',
    type: 'Open Source',
    skills: 'GatsbyJS, React, SCSS, Serverless, S3, Amazon Web Services',
    source: 'https://github.com/danielbh/danielhollcraft.com-gatsbyjs',
    mobilePreview: DanielHollcraftMobile,
    desktopPreview: DanielHollcraftDesktop,
    previewCaption: 'Daniel Hollcraft website preview',
    platform: 'Web',
    summary: ['Created my personal website using the Gatsby static website builder framework. With Gatsby you can create documentation sites, blogs, and community sites fast and without the need of a database.', 'I hosted the site on Amazon Web Services S3 and use some Amazon Web Services lambda functions to do a few house keeping operations. The result is ridiculously fast, highly scalable website, for a really low price.']
  },
  {
    title: 'A Tour Guide App for Paris, France',
    start: 'Aug 2016',
    end: 'Present',
    type: 'Freelance',
    skills: 'React Native, Google Places API, Node.js, REST, Amazon Web Services',
    appStore: 'https://appsto.re/us/5n7Bfb.i',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.antos_paris&hl=en',
    mobilePreview: LalParisMobile,
    previewCaption: 'Lal Paris preview',
    platform: 'Android, iOS',
    summary: ['Designed and built a tour guide app on Android and iOS with React Native for a top Paris tour guide. The app displays several of his best travelling tips,', 'Created a dynamic map view and integrated google places API to display various details for restaurants, bars, and other places tourists would find interesting.', 'Built a Node REST api server to serve data to the mobile application. Deployed it on Amazon Web Services.']
  },

  {
    title: 'An Agriculture Monitoring System (IoT)',
    start: 'Jan 2016',
    end: 'Mar 2017',
    type: 'Freelance',
    skills: 'Node.js, React, Meteor, Bluetooth, Raspberry Pi, WiFi, Docker, Cordova, Push Notifications, LESS, Resin.io',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.grass.monitor&hl=en',
    mobilePreview: GrassMonitorMobile,
    previewCaption: 'Grass Monitor preview',
    platform: 'Web, Android, iOS',
    summary: ['An agriculture monitoring system that displayed humidity, temperature, and luminosity of many different areas of a greenhouse. If any sensor reading was not what it was supposed to be, a notification was sent to the user\'s smart phone.', 'Created a system to manage data for new greenhouses and areas within the greenhouses.', 'Sensors were bluetooth and the software was created so that they could be connected to a raspberry pi via web or mobile app.', 'Implemented automated deployment across an entire fleet of raspberry pi\'s using third party tools.' , 'Deployed an open source administration app to administer user data.', 'Included software on: embedded hardware, a cloud server, and a web, iOS and Android app. Meteor was leveraged to create a one in the same, web and mobile app.','Collaborated with my client to create high quality specifications using examples and user stories, and then documented the specifications with automated tests.']
  },
]