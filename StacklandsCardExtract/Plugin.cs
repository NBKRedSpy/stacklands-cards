using BepInEx;
using BepInEx.Logging;
using HarmonyLib;
using System.Collections.Generic;

namespace StacklandsCardExtract;

[BepInPlugin(MyPluginInfo.PLUGIN_GUID, MyPluginInfo.PLUGIN_NAME, MyPluginInfo.PLUGIN_VERSION)]
public class Plugin : BaseUnityPlugin
{
    public static ManualLogSource PluginLogger { get; set; }
    public static HashSet<string> loggedStrings = new HashSet<string>();
    private void Awake()
    {

        Harmony harmony = new Harmony(MyPluginInfo.PLUGIN_GUID);
        harmony.PatchAll();

        Plugin.PluginLogger = Logger;
        
    }

    public static void LogOnce(string text)
    {
        
        if(loggedStrings.Add(text))
        {
            PluginLogger.LogInfo(text);
        }
    }
}
