module.exports = exports = {};

const nouns = {
  "ape" : "low, lunkish person",
  "atomy" : "speck, particle",
  "barbermonger" : "rascal who goes too often to the barber",
  "bed-presser" : "a lazy person who never gets out of bed",
  "bolting-hutch" : "barrel",
  "callet" : "prostitute",
  "canker-blossom" : "a worm that destroys flowers",
  "carrion" : "living carcass",
  "chough" : "jackdaw / chatterer",
  "clodpole" : "blockhead",
  "cobbler" : "shoe maker, but also fool",
  "cockatrice" : "mythological monster, kills at a glance",
  "coystrill" : "knave or base fellow",
  "cullion" : "a rascal",
  "cut-purse" : "thief",
  "elf-skin" : "a shriveled old person",
  "flibbertigibbet" : "a devil",
  "flirt-jack" : "man of low morals / promiscuous man",
  "fool" : "someone who acts stupidly",
  "fustilarian" : "an ugly and slow person",
  "goose" : "a goose",
  "gudgeon" : "fish",
  "harpy" : "mythical beast, shrill agent of vengeance",
  "hilding" : "a good-for-nothing",
  "idiot" : "idiot",
  "jack" : "contemptuous person",
  "knave" : "a dishonest or unscrupulous man",
  "loggerhead" : "stubborn fool, numbskull",
  "lown" : "rascal ",
  "mooncalf" : "monstrosity",
  "mountebank" : "Seller of fake goods, medical quacks",
  "mug" : "country bumpkin",
  "mushrump" : "mushroom",
  "neat's tongue" : "the tongue of a bovine, like a cow or an ox",
  "patch" : "clown or fool",
  "pignut" : "peanut",
  "princox" : "pert, saucy, upstart, the Prince of Coxcombs",
  "rampallion" : "a villain or rascal",
  "shough" : "shaggy haired dog",
  "slug-abed" : "lazy person, slug in a bed",
  "tabor" : "small drum used by clowns",
  "toad" : "slimy, repulsive, contemptible",
  "Tom O' Bedlam" : "beggar who was released from the madhouse",
  "urchin" : "street child",
  "varlet" : "low, uncouth character",
  "want-wit" : "someone lacking wits",
  "younker" : "sucker, easily fooled person"
};

const adjectives = {
  "arrant" : "outright",
  "asquint" : "crooked, malfunctioning",
  "bawbling" : "small",
  "beggarly" : "weak, cheap, lacking",
  "berattled" : "abused, beat up",
  "blasted" : "barren, devoid, also used for emphasis",
  "blinking" : "dazed, also used for emphasis",
  "brainsick" : "foolish, stupid",
  "broken" : "disturbed, bankrupt, or non-functional",
  "caterwauling" : "wailing, noisy",
  "chopt" : "chapped",
  "corky" : "dry with age",
  "dallying" : "fondling, wasting time",
  "drossy" : "frivolous",
  "enchafed" : "angry",
  "fleering" : "fawning/sneering mash-up",
  "fobbed" : "cheated",
  "fopped" : "duped",
  "fustian" : "bombastic, ridiculously pompous",
  "ghasted" : "frightened",
  "glass-gazing" : "vain",
  "goatish" : "lecherous",
  "grizzled" : "gray, decayed",
  "harebrained" : "stupid",
  "horsey" : "horse-like, horse-looking",
  "indign" : "unworthy",
  "lily-livered" : "cowardly",
  "mad-headed" : "crazy",
  "malapert" : "impertinent",
  "masterless" : "abandoned",
  "naughty" : "naughty (but stronger)",
  "out of warrant" : "unjustifiable",
  "paltering" : "quibbling or deceptive",
  "pandar" : "pimp, panderer",
  "puling" : "whining",
  "quailing" : "giving up in a cowardly manner",
  "reechy" : "smoky, foul",
  "reeking" : "sweating",
  "rheumy" : "moist",
  "scanted" : "ignored, lacking, stingy",
  "scurvy" : "despicable",
  "shark'd" : "gathered indiscriminately",
  "skimble-skamble" : "nonsensical",
  "sluggardly" : "lazy",
  "tetchy" : "fretful, peevish",
  "unbitted" : "uncontrolled",
  "unsinew'd" : "weak",
  "untaught" : "crude, ignorant",
  "vulgar" : "common, low-born",
  "wight" : "a cursed or unlucky person",
  "yerked" : "stabbed",
  "clay-brained" : "stupid"
};

const addressing = {
  "okay, you" : false,
  "thou art a": false,
  "thou be-est a": false
}

const nounarr = Object.keys(nouns);
const adjarr = Object.keys(adjectives);
const addrarr = Object.keys(addressing);

const getrand = (max) => {
  return(Math.round(Math.random() * max-1));
}

exports.burnMe = () => {
  // decide between pattern 1 or pattern 2
  // weight 40/60
  let nounarr = Object.keys(nouns);
  let adjarr = Object.keys(adjectives)
  let flipper = getrand(100);
  let insult = [];

  if(flipper < 40){
    insult = [addrarr[getrand(addrarr.length)], adjarr[getrand(adjarr.length)], nounarr[getrand(nounarr.length)]];
  } else {
    insult = [addrarr[getrand(addrarr.length)], adjarr[getrand(adjarr.length)], adjarr[getrand(adjarr.length)], nounarr[getrand(nounarr.length)]];
  }

  return insult;

}

exports.explainMe = (burn) => {
    let explanation = "";
    for (let i in burn){
      if (nouns[burn[i]]) {
        explanation += "<p>" + burn[i] + " means " + nouns[burn[i]] + "</p>";
      } else if (adjectives[burn[i]]) {
        explanation += "<p>" + burn[i] + " means " + adjectives[burn[i]] + "</p>";
      }
    }
    return explanation;   
}
