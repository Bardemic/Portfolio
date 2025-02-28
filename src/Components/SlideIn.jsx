import { motion } from "framer-motion"
export default function SlideIn({startAt, children}) {
    let startPosition = "-100%" //default is from left
    if(startAt == "right") {
        startPosition = "100%"
    }
    return (
        <motion.div
            initial={{x: startPosition, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{amount: 0.05, once: false}}
            transition={{type: "ease-in", duration: 0.75, stiffness: 50}}
            variants={{
                hidden: {opacity: 0, x: startPosition},
                visible: {opacity: 1, x: 0}
            }}
        >
            {children}
        </motion.div>
    )
}