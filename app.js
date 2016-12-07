new Vue({
  el: '#app',
  data: {
    debug: false,
    player: {life: 100, name: 'You'},
    monster: {life: 100, name: 'Monster'},
    state: 0,
  },
  methods: {
    startGame: function(){
      this.player.life = 100;
      this.monster.life = 100;
      this.state = 1;
    },
    monsterAttack: function() {
      var vm = this;
      setTimeout(function(){
        vm.player.life -= vm.calculateDamage(5,12);
        setTimeout(function(){
          vm.checkWin();
          vm.state = 1;

        }, 1000);
      }, 1500);
    },
    attack: function() {
      var damage = this.calculateDamage(3,10);
      this.monster.life -= damage;
      this.checkWin();
      if(this.monster.life <= 0) {
        this.state = 3;
      }
      else {
        this.state = 2;
        this.monsterAttack();
      }
    },

    special: function() {
      alert('used special');
    },

    heal: function() {
      alert('used heal');
    },

    giveUp: function() {
      alert('gave up');
    },

    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },

    checkWin: function() {
      if(this.monster.life <= 0) {
        if(confirm('You won! New game?')){
          this.startGame();
        } else {
          this.state = 3;
        }
      }
      else if (this.player.life <= 0) {
        if(confirm('You lost! New game?')){
          this.startGame();
        } else {
          this.state = 3;
        }
      }
    }

  }
})
