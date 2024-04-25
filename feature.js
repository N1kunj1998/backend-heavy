const name = "Random";
const name1 = "name1";
const name2 = "name2";

// module.exports = name;

export default name; // In case of deault export you can use any different name while importing 
export { name1, name2 }; //In case of only export you cannot use any different name

export const name3 = "name3";

// exporting functions
export const generateLovePercent = function() {
    return `${Math.floor(Math.random()*100)}%`;
}