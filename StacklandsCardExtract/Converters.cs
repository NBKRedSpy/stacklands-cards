using HarmonyLib;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace StacklandsCardExtract
{
    public static class Converters
    {
        public static FieldInfo allResultCardsFieldInfo = AccessTools.Field(typeof(Blueprint), "allResultCards");

        public static void AddFromObject(this JObject source, string key, object obj)
        {
            source.Add(key, JObject.FromObject(obj));
        }

        public static object CreateObject(CardData card)
        {
            return new
            {
                card.Id,
                card.Name,
                type = card.GetType().Name  
            };
        }

        public static object CreateObject(BaitBag baitBag)
        {
            if(baitBag == null) return null;

            return new
            {
                baitBag.BaitId,
                CardBag = CreateObject((CardBag)baitBag)
            };
        }

        public static object CreateObject(Blueprint blueprint)
        {
            if (blueprint == null) return null;

            return new
            {
                SubPrints = blueprint.Subprints.Select(x =>
                new
                {
                    x.RequiredCards,
                    x.CardsToRemove,
                    x.ResultAction,
                    x.Time,
                }).ToList(),
                //Seems to always be empty.
                Count = (allResultCardsFieldInfo.GetValue(blueprint) as List<CardData>).Count,
                AllResultCards = (allResultCardsFieldInfo.GetValue(blueprint) as List<CardData>)
                    .Select(x => CreateObject(x)).ToList(),
            };
        }


        public static object FromChance(List<CardChance> chances)
        {
            return chances.Select(x => FromChance(x)).ToList();
        }

        public static object FromChance(CardChance card)
        {
            return new
            {
                card.Id,
                card.Chance,
                card.PercentageChance,
                EnemyBag = card.EnemyBag.ToString(),
            };
        }

        public static object CreateObject(CardBag cardBag)
        {
            if (cardBag == null)
            {
                return null;
            };

            return JObject.FromObject(new
            {
                cardBag.CardsInPack,
                cardBag.ExpectedValue,
                cardBag.SetPackCards,
                chances = FromChance(cardBag.Chances),
                SetCardBag = cardBag.SetCardBag.ToString(),
                EnemySetCardBag = cardBag.ToString(),
                StrengthLevel = cardBag.StrengthLevel.ToString(),
                FallbackBag = cardBag.FallbackBag.ToString(),
                cardBag.EnemiesIncluded,
            });

        }

    }
}
