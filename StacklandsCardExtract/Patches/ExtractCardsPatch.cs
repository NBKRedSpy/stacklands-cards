//using HarmonyLib;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Serialization;
//using StacklandsCardExtract.DAL;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Reflection;
//using System.Text;
//using System.Text.RegularExpressions;
//using UnityEngine;

//namespace StacklandsCardExtract.Patches
//{



//    [HarmonyPatch(typeof(CardopediaScreen), "CreateEntries")]
//    public static class ExtractCardsPatch
//    {

//        public static Dictionary<string, DAL.Blueprint> DAL_Blueprints { get; } = new Dictionary<string, DAL.Blueprint>();

//        public const string CardFilePath = "c:\\work\\card-data.json";
//        public const string BlueprintCardFilePath = "c:\\work\\blueprints.json";

//        public static Regex ResourceRegex { get; set; }

//        public static void Prefix()
//        {
//            Plugin.PluginLogger.LogMessage("Prefix started");

//            File.Delete(CardFilePath);
//            File.Delete(BlueprintCardFilePath);

//            DebugUnlockAllCards();

//            List<CardData> list = WorldManager.instance.CardDataPrefabs;
//            list = (from x in list
//                    orderby x.MyCardType, x.FullName
//                    select x).ToList<CardData>();

//            foreach (CardData card in list)
//            {
//                string targetCardId = card.Id.Replace("blueprint_", "");

//                if (DAL_Blueprints.ContainsKey(targetCardId))
//                {
//                    //Already parsed.  This function is called many times during startup for some reason.
//                    continue;
//                }

//                Blueprint blueprint = card as Blueprint;

//                if (blueprint != null)
//                {
//                    //Remove cards with no names.  They seem to be bases or maps
//                    string formattedName = blueprint.Name.Replace("Idea: ", "");

//                    if (string.IsNullOrEmpty(formattedName)) continue;

//                    DAL.Blueprint blueprintJson = new DAL.Blueprint()
//                    {
//                        Id = blueprint.Id,
//                        Name = formattedName,
//                        Type = blueprint.BlueprintGroup.ToString(),
//                    };


//                    blueprintJson.Resources = blueprintJson.Resources = 
//                        blueprint.Subprints[0].DefaultText()
//                            .Split('\n')
//                            .ToList()
//                            .Select<string, BlueprintResource>(x => ParseResource(x))
//                            .ToList<BlueprintResource>();
                    
//                    //Remove the blueprint_ to just match the target card's id.
//                    DAL_Blueprints.Add(targetCardId , blueprintJson);

//                    Plugin.LogOnce($"Adding {targetCardId}");
//                }
                
//            }

//            Plugin.LogOnce($"Blueprint count: {DAL_Blueprints.Count}");

//            WriteAllCards(CardFilePath);
//            WriteAllCards(BlueprintCardFilePath);
            
//        }

//        /// <summary>
//        /// Writes all the cards in the DAL_Blueprints to the card file.
//        /// Overwrites the existing file.
//        /// </summary>
//        public static void WriteAllCards(string filePath = CardFilePath)
//        {



//            DefaultContractResolver contractResolver = new DefaultContractResolver
//            {
//                NamingStrategy = new CamelCaseNamingStrategy()
//            };

//            File.WriteAllText(CardFilePath,
//                 JsonConvert.SerializeObject(DAL_Blueprints.Values.ToList(),
//                    new JsonSerializerSettings
//                    {
//                        ContractResolver = contractResolver,
//                        Formatting= Formatting.Indented,
//                    }
//               )
//            );
//        }
//        /// <summary>
//        /// converts the resource text to a class.  
//        /// Example:  "1x Wood"
//        /// </summary>
//        /// <param name="resource"></param>
//        /// <returns></returns>
//        private static BlueprintResource ParseResource(string resource)
//        {
//            if(ResourceRegex == null)
//            {
//                ResourceRegex = new Regex("^(\\d+)x (.*)");
//            }

//            var match = ResourceRegex.Match(resource);

//            BlueprintResource resourceJson = new BlueprintResource()
//            {
//                Name = match.Groups[2].Value,
//                Count = int.Parse(match.Groups[1].Value)
//            };

//            return resourceJson;
//        } 

//        /// <summary>
//        /// WorldManager::DebugUnlockAllCards, but removes everything but the HideFromCardopedia filter.
//        /// </summary>
//        private static void DebugUnlockAllCards()
//        {
//            SaveGame currentSaveGame = WorldManager.instance.CurrentSaveGame;


//            List<CardData> list = WorldManager.instance.CardDataPrefabs.Where<CardData>((Func<CardData, bool>)(x => !x.HideFromCardopedia)).ToList<CardData>();

//            //Try clearing out the save ID's.  Might be duplicating
//            currentSaveGame.NewCardopediaIds.Clear();
//            currentSaveGame.FoundCardIds.Clear();

//            foreach (CardData cardData in list)
//            {
//                if (cardData.MyCardType == CardType.Ideas || cardData.MyCardType == CardType.Rumors)
//                    currentSaveGame.NewKnowledgeIds.Add(cardData.Id);
//                currentSaveGame.NewCardopediaIds.Add(cardData.Id);
//                currentSaveGame.FoundCardIds.Add(cardData.Id);
//            }
//        }
//    }





//}
