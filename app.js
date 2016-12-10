/*
  states
  0 - pre-game
  1 - player 1 attacking
  2 - player 2 attacking
  3 - game finished

*/


new Vue({
  el: '#app',
  data: {
    debug: false,
    state: 0,
    player: [
      {life: 0, lifeM: 100, aMin: 3, aMax: 10, delay: 0000, name: 'You'},
      {life: 0, lifeM: 100, aMin: 5, aMax: 12, delay: 1000, name: 'Monster'}
    ]
  },
  computed: {
    lifeScale: function() {
      var value = this.player[player].life * 100;
      value /= this.player[player].lifeM;
      return 40 + '%';
    },

    winner: function() {
      if(this.player[1].life <= 0){
        return 'You won!'
      }
      else{
        return 'You just lost The Game!'
      }
    }
  },
  methods: {
    startGame: function() {
      this.player[0].life = this.player[0].lifeM;
      this.player[1].life = this.player[1].lifeM;
      this.state = 1;
    },

    monsterAttack: function() {
      var vm = this;
      setTimeout(function() {
        vm.attack(1,0,1);
      }, vm.player[1].delay)

      setTimeout(function() {
        vm.state = 1;
      }, 2 * vm.player[1].delay);
    },

    attack: function(attack, defend, special) {
      var vm = this;
      // locks the control panel
      this.state = 2;

      this.player[defend].life -= special * this.calculateDamage(
        this.player[attack].aMin,
        this.player[attack].aMax
      );

      setTimeout(function(attack) {
        if(vm.checkContinue()) {
          // if the player attacks, the monster has a chance to attack back
          if(attack == 0) {
            vm.monsterAttack();
          }
        };
      }, 1300, attack);
    },

    special: function(attack, defend) {
      this.attack(attack, defend, 2);
    },

    heal: function(player) {
      if(this.player[player].life > 90){
        this.player[player].life = 100;
      }
      else {
        this.player[player].life += 10;
      }
      this.monsterAttack();
    },

    giveUp: function() {
      alert('gave up');
    },

    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },

    checkContinue: function() {
      // player 1 lost
      if(this.player[0].life <= 0 || this.player[1].life <= 0) {
        this.state = 3;
        return false;
      }
      // everybody is alive!
      else {
        return true;
      }

    },

  }
});
