/**
 * Created by svkior on 27/08/14.
 */
if (Firmwares.find().count() == 0){
    Firmwares.insert({
        url: 'http://localhost:3000/superproshivha.bit',
        fwname: 'top_arm_from_hell.bit',
        description: 'Работает хрень',
        author: "Max"
    });

    Firmwares.insert({
        url: 'http://localhost:3000/superproshivha.bit',
        fwname: 'top_arm_from_heaven.bit',
        description: 'Не работает хрень',
        author: "Max"
    });
}