import axios from 'axios';

export default {
  fetchEntryList: async () => {
    let res = await axios.get(`/fetchEntryList`);
    return res || [];
  },
  addEntryToContest: async (entry) => {
    console.log(entry);
    let res = await axios({
        method: 'post',
        url: '/addEntryToContest',
        data: {"entry": entry}
    });
    return res.data || [];
  }
}