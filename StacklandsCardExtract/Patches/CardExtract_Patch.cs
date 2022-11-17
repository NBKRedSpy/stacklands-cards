using HarmonyLib;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StacklandsCardExtract.DAL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Rendering;


namespace StacklandsCardExtract.Patches
{
    [HarmonyPatch(typeof(WorldManager), "Play")]
    public static class GameCardPatch
    {

        public static string BaseDir { get; }

        static GameCardPatch()
        {
            BaseDir = Path.Combine(Directory.GetCurrentDirectory(), "dumps");
            Directory.CreateDirectory(BaseDir);
        }


        static void LogInfo(string message)
        {
            Plugin.PluginLogger.LogInfo(message);
        }

        public static void Postfix(WorldManager __instance)
        {


            try
            {
                JArray jsonObjects = new JArray();
            
                foreach (var card in __instance.GameDataLoader.CardDataPrefabs)
                {
                    //LogInfo($"{card.Id} {GetDerivedTypes(card) }");

                    JObject obj = new JObject();

                    obj.AddFromObject("card", Converters.CreateObject(card));

                    if (card is Blueprint blueprint)
                    {
                        obj.AddFromObject("blueprint", Converters.CreateObject(blueprint));
                    }

                    if (card is Animal animal)
                    {
                        obj.Add("animal", JObject.FromObject(new
                        {
                            animal.CreateTime,
                            animal.CreateTimer,
                            animal.CreateCard
                        }));
                    }

                    if(card is Mob mob)
                    {
                        obj.Add("mob", JObject.FromObject(
                            new
                            {
                                Drops = Converters.CreateObject(mob.Drops)
                            }));
                    }

                    if(card is BlueprintRecipe blueprintRecipe)
                    {
                        obj.AddFromObject("blueprintRecipe", new
                        {
                            blueprintRecipe.Ingredients,
                            blueprintRecipe.ResultItems,
                            blueprintRecipe.CookingTime,
                        });
                    }

                    if (card is CombatableHarvestable ch)
                    {
                        obj.AddFromObject("combatableHarvestable", new
                        {
                            ch.Amount,
                            ch.HarvestTime,
                            MyCardBag = Converters.CreateObject(ch.MyCardBag),
                        });
                    }

                    if (card is Equipable e)
                    {
                        obj.AddFromObject("equipable", new
                        {
                            e.VillagerTypeOverride,
                            EquipableType = e.EquipableType.ToString(),
                            AttackType = e.AttackType.ToString(),
                            Blueprint = Converters.CreateObject(e.blueprint),
                            //CombatStats
                            //Level
                        });
                    }

                    //----manual types:
                    if (card is Crab crab)
                    {
                        obj.Add("Special", "Momma_crab when 3 killed");
                    }
                    if (card is Enemy enemy)
                    {
                        obj.Add("Special", "Enemy Type: Wolf + Bone = Dog");
                    }

                    if (card is FishTrap fishTrap)
                    {
                        obj.AddFromObject("fishTrap", new
                        {
                            fishTrap.FishTime,
                            DefaultBaitBag = Converters.CreateObject(fishTrap.DefaultBaitBag),
                            BaitBags = fishTrap.BaitBags.Select(x => Converters.CreateObject(x)).ToList(),
                        });
                    }

                    if (card is FishingSpot fishingSpot)
                    {
                        obj.AddFromObject("fishingSpot", new
                        {
                            NormalCardBag = Converters.CreateObject(fishingSpot.NormalCardBag),
                            FisherCardBag = Converters.CreateObject(fishingSpot.FisherCardBag),
                        });
                    }

                    if (card is Harvestable h)
                    {
                        obj.AddFromObject("harvestable", new
                        {
                            h.StatusTerm,
                            h.Amount,
                            h.IsUnlimited,
                            h.HarvestTime,
                            MyCardBag = Converters.CreateObject(h.MyCardBag),
                        });
                    }

                    if (card is Food f)
                    {
                        obj.AddFromObject("food", new
                        {
                            f.FoodValue,
                            f.ResultAction,
                            f.FullyConsumeResultAction,
                            f.SpoilTime,
                            f.CanSpoil,
                        });
                    }

                    if(card is TravellingCart c)
                    {
                        obj.AddFromObject("travellingCart", new
                        {
                            c.GoldToUse,
                            MyCardBag = Converters .CreateObject(c.MyCardBag)

                        });
                    }

                    if(card is TreasureChest t)
                    {
                        obj.AddFromObject("treasureChest", new
                        {
                            t.Amount,
                            Special = "Takes Key or another treasure_chest.  Todo:  randomly selects any resource or food that is not an island card).  Chance is random 0 to count",
                        });
                    }

                    if (card is House) obj.Add("special", "House + Kid = villager");
                    if (card is Parrot) obj.Add("special", "Parrot + pirate = friendly_pirate");
                    if (card is Poop) obj.Add("special", "Poop can take Resources Humans Food Poop.  Or a structure that is not a building(?)");
                    if (card is SacredChest) obj.Add("special", "Takes sacred_key, creates island_relic");
                    if (card is Sawmill) obj.Add("special", "Takes 2x wood, and makes a plank.");
                    if (card is Slime) obj.Add("special", "On death, creates 3 small slime");
                    if (card is Smelter) obj.Add("special", "Takes iron_ore wood sand gold_ore gold gold_bar glass.  Doesn't say output");
                    if (card is Spring) obj.Add("special", "Can have empty_bottle.  Can't find what it makes though.");
                    if (card is Stone) obj.Add("special", "Takes: Resources, Humans, Food, itself.  Otherwise not building structure.");

                    if (card is Temple) obj.Add("special", "Takes goblet.  Makes boss fight.");
                    if (card is Tentacle) obj.Add("special", "Spawns Kraken if all are dead (I think it is 0, not 1)");
                    if (card is Wood) obj.Add("special", "Can take Resources, Humans, Food, or structure that is not a building");


                    //todo:
                    //  Go back every card that has "CanHaveCard" logic.
                    //  Check all Die() to see if they drop something.  For example: Slime -> 3x small_slime

                    // Interesting:  The CanHaveCard might hint at non card combinations like friendly_pirate:
                    //      protected override bool CanHaveCard(CardData otherCard) => otherCard.Id == "parrot" || base.CanHaveCard(otherCard);
                    //  Then the other card handles the transform (parrot)

                    //---- End manual types

                    //Blueprint sub items.  No direct data:
                    //  BlueprintGrowth
                    //  BlueprintOffspring
                    //      may need to check on these:
                    //          card.MyGameCard.Parent = house.MyGameCard;
                    //          house.MyGameCard.Child = card.MyGameCard;
                    //  Enemy empty:  Mob



                    jsonObjects.Add(obj);   

                }

                string output =  JsonConvert.SerializeObject(jsonObjects, new JsonSerializerSettings() {
                    Formatting = Formatting.Indented,
                });

                File.WriteAllText(@"c:\work\cards.json", output);

                    //foreach (var card in WorldManager.instance.AllCards)
                    //{
                    //    LogInfo($"{card.name} {card?.CardData?.Name ?? "null"} ");
                    //}

            }
            catch (Exception ex)
            {
                LogInfo("Exception: " + ex.ToString());
            }

        }

        public static string GetDerivedTypes(object obj)
        {
            List<string> typeNames = new List<string>();

            Type type = obj.GetType();

            while(type != null && type != typeof(MonoBehaviour))
            {
                typeNames.Add(type.Name);
                type = type.BaseType;
            }

            return String.Join(" > ", typeNames);

        }

    }
}
