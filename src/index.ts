import axios from 'axios';
import notifier from 'notification-for-mac';

export interface DataDoctor {
  address: string;
  city: string;
  zipcode: string;
  name_with_title: string;
  link: string;
}

async function getAvailabilites() {
  const {
    data: {
      data: { doctors },
    },
  } = await axios.get<{ data: { doctors?: DataDoctor[] } }>(
    'https://www.doctolib.fr/vaccination-variole-du-singe/paris.json?availabilities=3',
  );

  if (doctors && doctors.length > 0) {
    const message = doctors
      .map((doctor) => `- ${doctor.name_with_title} - ${doctor.address}, ${doctor.zipcode} (${doctor.link})`)
      .join('\n');

    console.log(message);
    notifier('Des vaccins disponibles dans les 3 prochains jours à Paris', {
      sound: 'Frog',
      title: 'Vaccins disponibles',
    });
  } else {
    console.log('Vaccins non disponibles');
  }
}

setInterval(getAvailabilites, 1000 * 60 * 3);
process.stdin.resume();
