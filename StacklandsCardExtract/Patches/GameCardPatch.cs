//using HarmonyLib;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Reflection;
//using System.Text;
//using System.Threading.Tasks;
//using UnityEngine;
//using System.IO;
//using Newtonsoft.Json;

//namespace StacklandsCardExtract.Patches
//{
//    [HarmonyPatch(typeof(GameCard), "SetColors")]
//    public static class GameCardPatch
//    {

//        public static FieldInfo propBlockFieldInfo = null;

//        public static void Postfix(GameCard __instance)
//        {

//            if(propBlockFieldInfo == null)
//            {
//                propBlockFieldInfo = AccessTools.Field(typeof(GameCard), "propBlock");
//            }

//            DAL.Blueprint blueprint;

//            if(ExtractCardsPatch.DAL_Blueprints.TryGetValue(__instance.CardData.Id, out blueprint) == false)
//            {
//                Plugin.LogOnce($"Did not find CardData: {__instance.CardData.Id}");
//            }
//            else if (String.IsNullOrEmpty(blueprint.ColorHeader))
//            {

//                blueprint.ColorHeader = ((MaterialPropertyBlock)propBlockFieldInfo.GetValue(__instance)).GetColor("_Color").ToHtmlColor();
//                blueprint.ColorBody = ((MaterialPropertyBlock)propBlockFieldInfo.GetValue(__instance)).GetColor("_Color2").ToHtmlColor();

//                //Re-write the full file.  This is so unfound cards from the prefix will still be included.
//                //  Required since there isn't a way to indicate that the manual card search process is over.  That 
//                //  and not worth the time to add keybindings, etc.

//                ExtractCardsPatch.WriteAllCards();

//                Plugin.LogOnce($"Found {__instance.CardData.Id}");

//            }

//            Plugin.LogOnce($"Unmatched card count: {ExtractCardsPatch.DAL_Blueprints.Values
//                .Count(x => string.IsNullOrEmpty(x.ColorHeader) )}");
//        }

//        /// <summary>
//        /// Returns a string with RGBA(255,255,255,%) format.
//        /// </summary>
//        /// <param name="color"></param>
//        /// <returns></returns>
//        private static string ToHtmlColor(this Color color)
//        {
//#pragma warning disable Harmony003 // Harmony non-ref patch parameters modified
//            return $"rgba({(int)(color.r * 255f)}, {(int)(color.g * 255f)}, {(int)(color.b * 255f)}, {color.a})";
//#pragma warning restore Harmony003 // Harmony non-ref patch parameters modified
//        }



//    }
//}
