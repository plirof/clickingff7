/**
 * Item class
 * @param {Game} Game
 * @param {string} ref
 */

function Item(Game, data) {

  this._id = _.uniqueId();

  this.Game = Game;

  if (data) {
    this.extends(data);
  }
  if (!('type' in this)) {
    this.type = 'items';
  }
};

/**
 * Extends the data properties with saved data
 * @param  {object} infos
 */
Item.prototype.extends = function(data) {
  self = this;
  for (var i in data) {
    self[i] = data[i];
  }
};

/**
 * Use an item
 */
Item.prototype.use = function() {
  switch (this.ref) {
    case 'potion':
      this.Game.characters.addHp(this.getBonus());
      break;
    case 'hi-potion':
      this.Game.characters.addHp(this.getBonus());
      break;
  }
  for (var i in this.Game.items) {
    if (_.isEqual(this.Game.items[i], this)) {
      this.Game.items.splice(i, 1);
    }
  }
};

/**
 * Return description of the materia
 */
Item.prototype.getDesc = function() {
  var Txt = '';

  switch (this.ref) {
    case 'potion':
      Txt = 'HP +' + this.getBonus();
      break;
    case 'hi-potion':
      Txt = 'HP +' + this.getBonus();
      break;
  }

  return Txt;
};

/**
 * Returns the price of the weapon
 * @return {int}
 */
Item.prototype.getPrice = function() {
  return this.gils;
};

/**
 * Returns true if the weapon is owned in the inventory
 * @return {boolean}
 */
Item.prototype.inStock = function() {
  var items = _.where(this.Game.items, {
    ref: this.ref
  });
  return items.length;
};

/**
 * Return the total bonus of the item
 * @return {int}
 */
Item.prototype.getBonus = function() {
  return this.bonus;
};

/**
 * Save materia data
 */
Item.prototype.save = function() {
  return _.pick(this, 'ref');
};