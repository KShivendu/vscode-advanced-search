const y = 5;

define(['utils/crashDetection', 'utils/selfDriving'], function (crashDetection, selfDriving) {
    // full self driving
    while (true) {
        if (crashDetection.goingToCrash()) {
            selfDriving.dontCrash();
        }
    }
});

// Search:
// define([:[s1], :[s2]], function (:[v1], :[v2]) {:[body]})

/* Replace:
import(
    Promise.all([import(:[s1]), import(:[s2])]).then(([:[v1],:[v2]]) => {
        :[body]
    })
)
*/

/*
Regex (not possible but still an attempt):
define\(\[.*\], function \(.*\) \{(.)*\}
*/

