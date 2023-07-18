import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import SearchBox from './SearchBox';
const Indices = [
    {
        "name": "ACC",
        "nse": "ACC.NS",
        "bse": "500410"
    },
    {
        "name": "ADANIGREEN",
        "nse": "ADANIGREEN.NS",
        "bse": "541450"
    },
    {
        "name": "ADANIPORTS",
        "nse": "ADANIPORTS.NS",
        "bse": "532921"
    },
    {
        "name": "ADANIPOWER",
        "nse": "ADANIPOWER.NS",
        "bse": "533096"
    },
    {
        "name": "AJANTPHARM",
        "nse": "AJANTPHARM.NS",
        "bse": "532331"
    },
    {
        "name": "ALKEM",
        "nse": "ALKEM.NS",
        "bse": "539523"
    },
    {
        "name": "AMARAJABAT",
        "nse": "AMARAJABAT.NS",
        "bse": "500008"
    },
    {
        "name": "AMBUJACEM",
        "nse": "AMBUJACEM.NS",
        "bse": "500425"
    },
    {
        "name": "APLAPOLLO",
        "nse": "APLAPOLLO.NS",
        "bse": "533758"
    },
    {
        "name": "APOLLOHOSP",
        "nse": "APOLLOHOSP.NS",
        "bse": "508869"
    },
    {
        "name": "APOLLOTYRE",
        "nse": "APOLLOTYRE.NS",
        "bse": "500877"
    },
    {
        "name": "ASHOKLEY",
        "nse": "ASHOKLEY.NS",
        "bse": "500477"
    },
    {
        "name": "ASIANPAINT",
        "nse": "ASIANPAINT.NS",
        "bse": "500820"
    },
    {
        "name": "ASTRAZEN",
        "nse": "ASTRAZEN.NS",
        "bse": "506820"
    },
    {
        "name": "ATGL",
        "nse": "ATGL.NS",
        "bse": ""
    },
    {
        "name": "AUROPHARMA",
        "nse": "AUROPHARMA.NS",
        "bse": "524804"
    },
    {
        "name": "AVANTIFEED",
        "nse": "AVANTIFEED.NS",
        "bse": "540144"
    },
    {
        "name": "DMART",
        "nse": "DMART.NS",
        "bse": "540376"
    },
    {
        "name": "DABUR",
        "nse": "DABUR.NS",
        "bse": "500096"
    },
    {
        "name": "DEEPAKNTR",
        "nse": "DEEPAKNTR.NS",
        "bse": "532960"
    },
    {
        "name": "DHFL",
        "nse": "DHFL.NS",
        "bse": "511072"
    },
    {
        "name": "DISHTV",
        "nse": "DISHTV.NS",
        "bse": "532839"
    },
    {
        "name": "DIVISLAB",
        "nse": "DIVISLAB.NS",
        "bse": "532488"
    },
    {
        "name": "DLF",
        "nse": "DLF.NS",
        "bse": "532868"
    },
    {
        "name": "DRREDDY",
        "nse": "DRREDDY.NS",
        "bse": "500124"
    },
    {
        "name": "EICHERMOT",
        "nse": "EICHERMOT.NS",
        "bse": "505200"
    },
    {
        "name": "GAIL",
        "nse": "GAIL.NS",
        "bse": "532155"
    },
    {
        "name": "GICRE",
        "nse": "GICRE.NS",
        "bse": "540755"
    },
    {
        "name": "GLENMARK",
        "nse": "GLENMARK.NS",
        "bse": "532296"
    },
    {
        "name": "GMRINFRA",
        "nse": "GMRINFRA.NS",
        "bse": "532754"
    },
    {
        "name": "GODREJCP",
        "nse": "GODREJCP.NS",
        "bse": "532424"
    },
    {
        "name": "GODREJPROP",
        "nse": "GODREJPROP.NS",
        "bse": "533150"
    },
    {
        "name": "GRANULES",
        "nse": "GRANULES.NS",
        "bse": "532482"
    },
    {
        "name": "GRASIM",
        "nse": "GRASIM.NS",
        "bse": "500300"
    },
    {
        "name": "GSKCONS",
        "nse": "GSKCONS.NS",
        "bse": "500676"
    },
    {
        "name": "GSPL",
        "nse": "GSPL.NS",
        "bse": "532702"
    },
    {
        "name": "HAVELLS",
        "nse": "HAVELLS.NS",
        "bse": "517354"
    },
    {
        "name": "HCLTECH",
        "nse": "HCLTECH.NS",
        "bse": "532281"
    },
    {
        "name": "HDFCAMC",
        "nse": "HDFCAMC.NS",
        "bse": "541729"
    },
    {
        "name": "HDFCBANK",
        "nse": "HDFCBANK.NS",
        "bse": "500180"
    },
    {
        "name": "HDFCLIFE",
        "nse": "HDFCLIFE.NS",
        "bse": "540777"
    },
    {
        "name": "HEROMOTOCO",
        "nse": "HEROMOTOCO.NS",
        "bse": "500182"
    },
    {
        "name": "HINDALCO",
        "nse": "HINDALCO.NS",
        "bse": "500440"
    },
    {
        "name": "HINDPETRO",
        "nse": "HINDPETRO.NS",
        "bse": "500104"
    },
    {
        "name": "HINDUNILVR",
        "nse": "HINDUNILVR.NS",
        "bse": "500696"
    },
    {
        "name": "HINDZINC",
        "nse": "HINDZINC.NS",
        "bse": "500188"
    },
    {
        "name": "HUDCO",
        "nse": "HUDCO.NS",
        "bse": "540530"
    },
    {
        "name": "HDFC",
        "nse": "HDFC.NS",
        "bse": "500010"
    },
    {
        "name": "ICICIBANK",
        "nse": "ICICIBANK.NS",
        "bse": "532174"
    },
    {
        "name": "ICICIGI",
        "nse": "ICICIGI.NS",
        "bse": "532401"
    },
    {
        "name": "ICICIPRULI",
        "nse": "ICICIPRULI.NS",
        "bse": "540133"
    },
    {
        "name": "ICICISENSX",
        "nse": "ICICISENSX.NS",
        "bse": ""
    },
    {
        "name": "ICICIBANK",
        "nse": "ICICIBANK.NS",
        "bse": "532174"
    },
    {
        "name": "IDBI",
        "nse": "IDBI.NS",
        "bse": "500116"
    },
    {
        "name": "IDFCFIRSTB",
        "nse": "IDFCFIRSTB.NS",
        "bse": "539437"
    },
    {
        "name": "IGL",
        "nse": "IGL.NS",
        "bse": "532514"
    },
    {
        "name": "INDHOTEL",
        "nse": "INDHOTEL.NS",
        "bse": "500198"
    },
    {
        "name": "INDIACEM",
        "nse": "INDIACEM.NS",
        "bse": "530005"
    },
    {
        "name": "INDIAMART",
        "nse": "INDIAMART.NS",
        "bse": "543389"
    },
    {
        "name": "INDIGO",
        "nse": "INDIGO.NS",
        "bse": "539448"
    },
    {
        "name": "INDUSINDBK",
        "nse": "INDUSINDBK.NS",
        "bse": "532187"
    },
    {
        "name": "INFY",
        "nse": "INFY.NS",
        "bse": "500209"
    },
    {
        "name": "IOC",
        "nse": "IOC.NS",
        "bse": "530965"
    },
    {
        "name": "IRB",
        "nse": "IRB.NS",
        "bse": "532947"
    },
    {
        "name": "ITC",
        "nse": "ITC.NS",
        "bse": "500875"
    },
    {
        "name": "JINDALSTEL",
        "nse": "JINDALSTEL.NS",
        "bse": "532286"
    },
    {
        "name": "JSWENERGY",
        "nse": "JSWENERGY.NS",
        "bse": "533148"
    },
    {
        "name": "JSWSTEEL",
        "nse": "JSWSTEEL.NS",
        "bse": "500228"
    },
    {
        "name": "JUBLFOOD",
        "nse": "JUBLFOOD.NS",
        "bse": "533155"
    },
    {
        "name": "KOTAKBANK",
        "nse": "KOTAKBANK.NS",
        "bse": "500247"
    },
    {
        "name": "L&TFH",
        "nse": "L&TFH.NS",
        "bse": "533519"
    },
    {
        "name": "LICHSGFIN",
        "nse": "LICHSGFIN.NS",
        "bse": "500253"
    },
    {
        "name": "LT",
        "nse": "LT.NS",
        "bse": "500510"
    },
    {
        "name": "LUPIN",
        "nse": "LUPIN.NS",
        "bse": "500257"
    },
    {
        "name": "M&M",
        "nse": "M&M.NS",
        "bse": "500520"
    },
    {
        "name": "M&MFIN",
        "nse": "M&MFIN.NS",
        "bse": "532720"
    },
    {
        "name": "MANAPPURAM",
        "nse": "MANAPPURAM.NS",
        "bse": "531213"
    },
    {
        "name": "MARICO",
        "nse": "MARICO.NS",
        "bse": "531642"
    },
    {
        "name": "MARUTI",
        "nse": "MARUTI.NS",
        "bse": "532500"
    },
    {
        "name": "MCDOWELL-N",
        "nse": "MCDOWELL-N.NS",
        "bse": "532432"
    },
    {
        "name": "MFSL",
        "nse": "MFSL.NS",
        "bse": "500255"
    },
    {
        "name": "MGL",
        "nse": "MGL.NS",
        "bse": "539957"
    },
    {
        "name": "MINDTREE",
        "nse": "MINDTREE.NS",
        "bse": "532819"
    },
    {
        "name": "MOTHERSUMI",
        "nse": "MOTHERSUMI.NS",
        "bse": "517334"
    },
    {
        "name": "MPHASIS",
        "nse": "MPHASIS.NS",
        "bse": "526299"
    },
    {
        "name": "MRF",
        "nse": "MRF.NS",
        "bse": "500290"
    },
    {
        "name": "MUTHOOTFIN",
        "nse": "MUTHOOTFIN.NS",
        "bse": "533398"
    },
    {
        "name": "NAM-INDIA",
        "nse": "NAM-INDIA.NS",
        "bse": "533519"
    },
    {
        "name": "NATIONALUM",
        "nse": "NATIONALUM.NS",
        "bse": "532234"
    },
    {
        "name": "NAUKRI",
        "nse": "NAUKRI.NS",
        "bse": "532777"
    },
    {
        "name": "NESTLEIND",
        "nse": "NESTLEIND.NS",
        "bse": "500790"
    },
    {
        "name": "NMDC",
        "nse": "NMDC.NS",
        "bse": "526371"
    },
    {
        "name": "NTPC",
        "nse": "NTPC.NS",
        "bse": "532555"
    },
    {
        "name": "OIL",
        "nse": "OIL.NS",
        "bse": "533106"
    },
    {
        "name": "ONGC",
        "nse": "ONGC.NS",
        "bse": "500312"
    },
    {
        "name": "PAGEIND",
        "nse": "PAGEIND.NS",
        "bse": "532827"
    },
    {
        "name": "PEL",
        "nse": "PEL.NS",
        "bse": "500302"
    },
    {
        "name": "PETRONET",
        "nse": "PETRONET.NS",
        "bse": "532522"
    },
    {
        "name": "PIDILITIND",
        "nse": "PIDILITIND.NS",
        "bse": "500331"
    },
    {
        "name": "PEL",
        "nse": "PEL.NS",
        "bse": "500302"
    },
    {
        "name": "PFC",
        "nse": "PFC.NS",
        "bse": "532810"
    },
    {
        "name": "PGHH",
        "nse": "PGHH.NS",
        "bse": "500459"
    },
    {
        "name": "PGHL",
        "nse": "PGHL.NS",
        "bse": "500459"
    },
    {
        "name": "PNB",
        "nse": "PNB.NS",
        "bse": "532461"
    },
    {
        "name": "POWERGRID",
        "nse": "POWERGRID.NS",
        "bse": "532898"
    },
    {
        "name": "PVR",
        "nse": "PVR.NS",
        "bse": "532689"
    },
    {
        "name": "RAMCOCEM",
        "nse": "RAMCOCEM.NS",
        "bse": "500260"
    },
    {
        "name": "RBLBANK",
        "nse": "RBLBANK.NS",
        "bse": "540065"
    },
    {
        "name": "RELIANCE",
        "nse": "RELIANCE.NS",
        "bse": "500325"
    },
    {
        "name": "RECLTD",
        "nse": "RECLTD.NS",
        "bse": "532955"
    },
    {
        "name": "SAIL",
        "nse": "SAIL.NS",
        "bse": "500113"
    },
    {
        "name": "SBICARD",
        "nse": "SBICARD.NS",
        "bse": "543066"
    },
    {
        "name": "SBILIFE",
        "nse": "SBILIFE.NS",
        "bse": "540719"
    },
    {
        "name": "SCHAEFFLER",
        "nse": "SCHAEFFLER.NS",
        "bse": "505790"
    },
    {
        "name": "SHREECEM",
        "nse": "SHREECEM.NS",
        "bse": "500387"
    },
    {
        "name": "SIEMENS",
        "nse": "SIEMENS.NS",
        "bse": "500550"
    },
    {
        "name": "SRTRANSFIN",
        "nse": "SRTRANSFIN.NS",
        "bse": "511218"
    },
    {
        "name": "SUNPHARMA",
        "nse": "SUNPHARMA.NS",
        "bse": "524715"
    },
    {
        "name": "SUNTV",
        "nse": "SUNTV.NS",
        "bse": "532733"
    },
    {
        "name": "TATACHEM",
        "nse": "TATACHEM.NS",
        "bse": "500770"
    },
    {
        "name": "TATACONSUM",
        "nse": "TATACONSUM.NS",
        "bse": "500800"
    },
    {
        "name": "TATAMOTORS",
        "nse": "TATAMOTORS.NS",
        "bse": "500570"
    },
    {
        "name": "TATAPOWER",
        "nse": "TATAPOWER.NS",
        "bse": "500400"
    },
    {
        "name": "TATASTEEL",
        "nse": "TATASTEEL.NS",
        "bse": "500470"
    },
    {
        "name": "TCS",
        "nse": "TCS.NS",
        "bse": "532540"
    },
    {
        "name": "TECHM",
        "nse": "TECHM.NS",
        "bse": "532755"
    },
    {
        "name": "TITAN",
        "nse": "TITAN.NS",
        "bse": "500114"
    },
    {
        "name": "TORNTPHARM",
        "nse": "TORNTPHARM.NS",
        "bse": "524816"
    },
    {
        "name": "TORNTPOWER",
        "nse": "TORNTPOWER.NS",
        "bse": "533001"
    },
    {
        "name": "TRENT",
        "nse": "TRENT.NS",
        "bse": "500251"
    },
    {
        "name": "UBL",
        "nse": "UBL.NS",
        "bse": "532478"
    },
    {
        "name": "ULTRACEMCO",
        "nse": "ULTRACEMCO.NS",
        "bse": "532538"
    },
    {
        "name": "UNIONBANK",
        "nse": "UNIONBANK.NS",
        "bse": "532477"
    },
    {
        "name": "UPL",
        "nse": "UPL.NS",
        "bse": "512070"
    },
    {
        "name": "VEDL",
        "nse": "VEDL.NS",
        "bse": "500295"
    },
    {
        "name": "VOLTAS",
        "nse": "VOLTAS.NS",
        "bse": "500575"
    },
    {
        "name": "WIPRO",
        "nse": "WIPRO.NS",
        "bse": "507685"
    },
    {
        "name": "YESBANK",
        "nse": "YESBANK.NS",
        "bse": "532648"
    },
    {
        "name": "ZEEL",
        "nse": "ZEEL.NS",
        "bse": "505537"
    }
]
const SearchContent = () => {
    const [show, setShow] = useState(false)
    const [searchtext, setSearchText] = useState(null)
    const navigation = useNavigation()
    const SearchContents = (text) => {
        setShow(text.length > 0)
        setSearchText(text)
    }
    const handleItemPress = (item) => {

        navigation.navigate("StockDetails", { name: item.nse })
        //console.log()

    };
    return (
        <View>
            <SearchBox updateState={SearchContents} />
            {
                show ?
                    <>
                        <FlatList
                            data={Indices.filter((item) => item.name.toLowerCase().includes(searchtext.toLowerCase()))}
                            keyExtractor={(item, index) => `key-${index}`}
                            renderItem={({ item }) => {
                                // console.log(item);
                                return (
                                    <View style={{
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row',
                                        padding: 10,
                                    }}>
                                        <View style={{
                                            margin: 10
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => handleItemPress(item)}
                                            >
                                                <Text
                                                    style={{
                                                        color: 'black',
                                                        width: '100%',
                                                        fontSize: 18,
                                                    }}
                                                >
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </>
                    : null
            }
        </View>
    )
}
export default SearchContent