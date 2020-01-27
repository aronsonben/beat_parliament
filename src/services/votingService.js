import axios from 'axios';

export default {
  submitVote: async () => {
    let res = await axios.get(`/submit`);
    return res.data || [];
  },
  submitEntry: async (entryData) => {
    let res = await axios({
      method: 'post',
      url: '/submitEntry',
      data: {
        artist: entryData.artist,
        track: entryData.track,
        link: entryData.link
      }
    });
    return res.data || [];
  }
}