export default {
  //computiong properties
  computed: {
    filteredTeams: function() {
      return this.teams.filter(team => {
        if (team.data().name.match(this.search_data)) {
          return team.data().name.match(this.search_data);
        } else if (team.data().country.match(this.search_data)) {
          return team.data().country.match(this.search_data);
        }
        //else if (item.tags[0].match(this.search_data)) {
        //     return item.tags[0].match(this.search_data);
        // } else if (item.tags[1].match(this.search_data)) {
        //     return item.tags[1].match(this.search_data);
        // } else if (item.tags[2].match(this.search_data)) {
        //     return item.tags[2].match(this.search_data);
        // }

        // else if {
        //     for (var i = 0, i <= item.tags.length, i++) {
        //         this.if(item.tags[i].match(this.search_data)) {
        //             return item.tags[i].match(this.search_data);
        //         }
        //     }
        // }
      });
    }
  }
};
