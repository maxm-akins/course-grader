'use client'


import { Divider, useMediaQuery, List, ListItem, ListItemButton, ListItemIcon, Box, Icon, IconButton, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

export default function NavBar({ children, home }) {
    const router = useRouter();
    const theme = useTheme();
    const [showMenu, setShowMenu] = useState(false);
    const [showCollapseMenu, setShowCollapseMenu] = useState(false);
    let showCollapse = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <>
            <AnimatePresence>
                { showCollapse && (
                    <Box
                        component={ motion.div }
                        initial={ { opacity: 0, scale: 0 } }
                        animate={ { opacity: 1, scale: 1 } }
                        exit={ { opacity: 0, scale: 0 } }
                        transition={ { duration: .15, type: "spring" } }
                        position="fixed"
                        sx={ {
                            boxShadow: router.pathname === "/" ? 0 : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            transition: "all .3s",
                            background: router.pathname === "/" ? theme.palette.background.transparent : theme.palette.primary.char,
                            display: "flex",
                            justifyContent: "start",
                            width: "100%",
                            alignItems: "center",
                            alignContent: "center",
                            color: router.pathname === "/" ? theme.palette.primary.white : theme.palette.primary.white,
                            zIndex: 1000,
                            "&:hover": {
                                backgroundColor: router.pathname === "/" ? theme.palette.background.transparentish : theme.palette.primary.char,
                            }
                        } }
                    >

                        <Box
                            sx={ {
                                display: "flex",
                                justifyContent: "start",
                                width: "10%",
                                alignItems: "start"
                            } }
                        >


                            <Box
                                sx={ {
                                    mt: 1,
                                    ml: 1,
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                } }
                            >

                                { router.pathname === "/" ? (

                                    <Image src="/images/purpleSig.png" width={ 200 } height={ 50 } alt='nothing'
                                        unoptimized
                                        onClick={ () => {
                                            router.push('/about-me')
                                        } }
                                        style={ {
                                            minWidth: 200

                                        } }

                                    />
                                ) : (
                                    <Image src="/images/lightBlueSig.png" width={ 200 } height={ 50 } alt='nothing'
                                        unoptimized
                                        onClick={ () => {
                                            router.push('/about-me')
                                        } }
                                        style={ {
                                            minWidth: 200
                                        } }

                                    />
                                )
                                }

                            </Box>
                        </Box>
                        <Box
                            sx={ {
                                display: "flex",
                                justifyContent: "end",
                                width: "90%",
                                alignItems: "start"
                            } }
                        >

                            <Box
                                onClick={ () => {
                                    router.push('/')
                                } }
                                sx={ {

                                    m: 3,

                                } }
                            >
                                <Typography
                                    component={ motion.div }
                                    whileHover={ { scale: 1.3 } }
                                    whileTap={ { scale: 0.9 } }
                                    sx={ {
                                        fontSize: "0.8em",
                                        fontWeight: 300,
                                    } }>
                                    Home
                                </Typography>
                            </Box>


                            <Box

                                onMouseEnter={ () => setShowMenu(true) }
                                onMouseLeave={ () => setShowMenu(false) }
                                sx={ {
                                    m: 3,
                                } }

                            >
                                <Typography
                                    component={ motion.div }
                                    whileHover={ { scale: 1.1 } }
                                    whileTap={ { scale: 0.9 } }
                                    sx={ {
                                        fontSize: "0.8em",
                                        fontWeight: 300,
                                        height: "100%",

                                    } }>
                                    Resume
                                </Typography>

                                { showMenu && (

                                    <Box
                                        key="menu"
                                        component={ motion.div }
                                        initial={ { y: "-100%" } }
                                        animate={ { y: 0, } }
                                        transition={ { duration: .15 } }
                                        sx={ {
                                            position: "fixed",
                                            pt: 3
                                        } }
                                    >
                                        <List
                                            sx={ {
                                                backgroundColor: router.pathname === "/" ? theme.palette.background.transparentish : theme.palette.primary.char,
                                                color: theme.palette.primary.white,
                                                fontWeight: 300,
                                                zIndex: 1001,
                                                p: 0,
                                                borderRadius: "0px 0px 10px 10px"

                                            } }
                                        >



                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    onClick={ () => {
                                                        router.push({
                                                            pathname: '/resume',
                                                            query: { "q": "0" }
                                                        })

                                                    } }
                                                >
                                                    <ListItemIcon>
                                                        <Icon className='material-symbols-outlined'
                                                            sx={ {
                                                                color: theme.palette.primary.white,
                                                                fontSize: 30,

                                                                fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;",
                                                            } }
                                                        >work</Icon>
                                                    </ListItemIcon>
                                                    Work Experience
                                                </ListItemButton>
                                            </ListItem>

                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    onClick={ () => {
                                                        router.push({
                                                            pathname: '/resume',
                                                            query: { "q": "1" }
                                                        })
                                                    } }
                                                >
                                                    <ListItemIcon>
                                                        <Icon className='material-symbols-outlined'
                                                            sx={ {
                                                                color: theme.palette.primary.white,
                                                                fontSize: 30,
                                                                fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;",
                                                            } }
                                                        >task</Icon>
                                                    </ListItemIcon>
                                                    Projects
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    onClick={ () => {
                                                        router.push({
                                                            pathname: '/resume',
                                                            query: { "q": "2" }
                                                        })
                                                    } }
                                                >
                                                    <ListItemIcon>
                                                        <Icon className='material-symbols-outlined'
                                                            sx={ {
                                                                color: theme.palette.primary.white,
                                                                fontSize: 30,
                                                                fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;",
                                                            } }
                                                        >school</Icon>
                                                    </ListItemIcon>
                                                    Degree Progress
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    onClick={ () => {
                                                        router.push({
                                                            pathname: '/resume',
                                                            query: { "q": "3" }
                                                        })
                                                    } }
                                                >
                                                    <ListItemIcon>
                                                        <Icon className='material-symbols-outlined'
                                                            sx={ {
                                                                color: theme.palette.primary.white,
                                                                fontSize: 30,
                                                                fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;",
                                                            } }
                                                        >star_rate</Icon>
                                                    </ListItemIcon>
                                                    Skills and Achievements
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Box>

                                ) }
                            </Box>


                            <Box
                                sx={ {
                                    m: 3,
                                } }
                                onClick={ () => {
                                    router.push('/about-this-site')
                                } }
                            >
                                <Typography
                                    component={ motion.div }
                                    whileHover={ { scale: 1.3 } }
                                    whileTap={ { scale: 0.9 } }

                                    sx={ {
                                        fontSize: "0.8em",
                                        fontWeight: 300,
                                    } }>
                                    About this site
                                </Typography>
                            </Box>
                            <Box
                                sx={ {
                                    m: 3,
                                } }
                                onClick={ () => {
                                    router.push('/about-me')
                                } }
                            >
                                <Typography
                                    component={ motion.div }
                                    whileHover={ { scale: 1.3 } }
                                    whileTap={ { scale: 0.9 } }
                                    sx={ {
                                        fontSize: "0.8em",
                                        fontWeight: 300,
                                    } }>
                                    About Me
                                </Typography>
                            </Box>
                            <Box
                                sx={ {
                                    m: 3,
                                } }
                                onClick={ () => {
                                    router.push('/links-and-contact')
                                } }

                            >

                                <Typography
                                    component={ motion.div }
                                    whileHover={ { scale: 1.3 } }
                                    whileTap={ { scale: 0.9 } }
                                    sx={ {
                                        fontSize: "0.8em",
                                        fontWeight: 300,
                                    } }>
                                    Links and Contact
                                </Typography>
                            </Box>
                        </Box>



                    </Box>
                ) }

            </AnimatePresence>

            <AnimatePresence>

                { (!showCollapse) && (
                    <Box
                        component={ motion.div }
                        exit={ { opacity: 0 } }
                        position="absolute"
                        sx={ {
                            zIndex: 1000,
                            backgroundColor: router.pathname === "/" ? theme.palette.background.transparent : theme.palette.background.char,
                            boxShadow: 0,
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            alignItems: "start",
                            flexWrap: "wrap"
                        } }

                    >
                        <AnimatePresence>
                            { showCollapseMenu && (
                                <Box
                                    component={ motion.div }
                                    initial={ { y: "-100%" } }
                                    animate={ { y: 0, } }
                                    transition={ { duration: .15 } }
                                    exit={ { y: "-100%" } }
                                    key="12312"
                                    position="absolute"
                                    sx={ {
                                        width: "100%"
                                    } }
                                >
                                    <List
                                        sx={ {
                                            backdropFilter: "blur(3px)",
                                            color: theme.palette.primary.char,
                                            backgroundColor: router.pathname === "/" ? theme.palette.background.white : theme.palette.background.barelyTransparent,
                                            fontWeight: 300,
                                            pt: 7,
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center"
                                        } }
                                    >
                                        <ListItem disablePadding
                                            sx={ { color: theme.palette.primary.secondary } }
                                        >
                                            <ListItemButton
                                                onClick={ () => {
                                                    router.push('/')
                                                    setShowCollapseMenu(false);
                                                } }
                                            >
                                                Home
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />

                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={ () => {
                                                    router.push({
                                                        pathname: '/resume',
                                                        query: { "q": "0" }
                                                    });
                                                    setShowCollapseMenu(false);
                                                } }
                                            >
                                                Work Experience
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={ () => {
                                                    router.push({
                                                        pathname: '/resume',
                                                        query: { "q": "1" }
                                                    });
                                                    setShowCollapseMenu(false);
                                                } }
                                            >
                                                Projects
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={ () => {
                                                    router.push({
                                                        pathname: '/resume',
                                                        query: { "q": "2" }
                                                    });
                                                    setShowCollapseMenu(false);
                                                } }
                                            >
                                                Degree Progress
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={ () => {
                                                    router.push({
                                                        pathname: '/resume',
                                                        query: { "q": "3" }
                                                    });
                                                    setShowCollapseMenu(false);
                                                } }
                                            >
                                                Skills and Achievements
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />


                                        <ListItem disablePadding
                                            sx={ { color: theme.palette.primary.main } }
                                        >
                                            <ListItemButton
                                                onClick={ () => {
                                                    router.push('/about-this-site');
                                                    setShowCollapseMenu(false);
                                                } }
                                            >
                                                About this site
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding
                                            sx={ { color: theme.palette.primary.main } }
                                        >
                                            <ListItemButton
                                                onClick={ () => {
                                                    router.push('/about-me');
                                                    setShowCollapseMenu(false);
                                                } }
                                            >
                                                About Me
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding
                                            sx={ { color: theme.palette.primary.main } }
                                        >
                                            <ListItemButton
                                                onClick={ () => {
                                                    router.push('/links-and-contact');
                                                    setShowCollapseMenu(false);
                                                } }
                                            >
                                                Links and Contact
                                            </ListItemButton>
                                        </ListItem>

                                    </List>

                                </Box>

                            ) }

                        </AnimatePresence>


                        <Box
                            component={ motion.div }
                            initial={ { opacity: 0 } }
                            animate={ { opacity: 1, rotate: 360 } }
                            transition={ { duration: .5 } }
                            exit={ { rotate: 0, opacity: 0 } }
                            key="modal"
                            sx={ { width: "100%", display: "flex", justifyContent: "center" } }>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={ { mr: 2, ml: 2 } }
                                onClick={ () => setShowCollapseMenu((prev) => !prev) }
                            >
                                <Icon className='material-symbols-outlined'
                                    sx={ {
                                        color: router.pathname === "/" ? theme.palette.primary.char : theme.palette.primary.white,
                                        fontSize: 30,
                                        fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;",
                                    } }
                                >menu</Icon>
                            </IconButton>
                        </Box>
                    </Box>
                ) }
            </AnimatePresence>

        </>


    );
}