module.exports.classify = function(card) {
  card.tags = [];

  (card.ability || []).forEach(abil => {
    if(!abil) return;

    if(abil.includes('Assist')) {
      card.tags.push('Assist');
    }

    if(abil.includes('Bond')) {
      card.tags.push('Bond');
    }

    if(abil.includes('Brainstorm')) {
      card.tags.push('Brainstorm');
    }

    if(abil.includes('Change')) {
      card.tags.push('Change');
    }

    if(abil.includes('Encore')) {
      card.tags.push('Encore');
    }

    if(abil.includes('Experience')) {
      card.tags.push('Experience');
    }

    if(abil.includes('Great Performance')) {
      card.tags.push('Great Performance');
    }

    if(abil.includes('Memory')) {
      card.tags.push('Memory');
    }

    if(abil.includes('Shift')) {
      card.tags.push('Shift');
    }
  });

  return card;
}
